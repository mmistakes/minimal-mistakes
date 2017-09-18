# wavelet.py
"""continuous wavelet transform and support functions
based on Torrence and Compo 1998 (T&C)
depends on numpy and scipy
"""

from __future__ import division, print_function

import numpy as np

from scipy.signal import fftconvolve as _fftconv
from scipy.special import gamma as _gam

_SQRT2 = np.sqrt(2.)


class WaveletBasis(object):
    """An object setting up a CWT basis for forward and inverse transforms
    of data using the same sample rate and frequency scales.  At
    initialization given N, dt, and dj, the scales will be computed from
    the ``_get_scales`` function based on the Nyquist period of the wavelet
    and the length of the data.
    See T&C section 3.f for more information about how scales are choosen.
    """
    def __init__(self, wavelet=None, N=None, dt=1, dj=1/16):
        """WaveletBasis(wavelet=MorletWave(), N=None, dt=1, dj=1/16)

        :param wavelet: wavelet basis function which takes two arguments.
            First arguement is the time to evaluate the wavelet function.
            The second is the scale or width parameter.  The wavelet
            function should be normalized to unit weight at scale=1, and
            have zero mean.
        :param N: length of time domain data
        :param dt: sample cadence of data, needed for normalization
            of transforms
        :param dj: scale step size, used to determine the scales for
            the transform

        Note that the wavelet function used here has different requirements
        than ``scipy.signal.cwt``.  The Ricker and Morlet wavelet functions
        provided in ``scipy.signal`` are incompatible with this function.
        The ``MorletWave`` and ``PaulWave`` callable objects provided in
        this module can be used, if initialized.
        """
        if wavelet is None:
            wavelet = MorletWave()  # default to Morlet, w0=6
        if not isinstance(N, int):
            raise TypeError("N must be an integer")
        
        self._wavelet = wavelet
        self._dt = dt
        self._dj = dj
        self._N = N

        self._inv_root_scales = 1./np.sqrt(self.scales)

    # don't allow setting of properties!
    # all are determined at creation and frozen!
    @property
    def wavelet(self):
        return self._wavelet

    @property
    def dt(self):
        return self._dt
    @property
    def dj(self):
        return self._dj

    @property
    def N(self):
        return self._N

    @property
    def s0(self):
        if not hasattr(self, '_s0'):
            try:
                self._s0 = self.wavelet.nyquist_scale(self.dt)
            except AttributeError:
                self._s0 = 2*dt
        return self._s0

    @property
    def scales(self):
        if not hasattr(self, '_scales'):
            self._scales = self._get_scales()
        return self._scales

    @property
    def M(self):
        if not hasattr(self, '_M'):
            self._M = len(self.scales)
        return self._M

    @property
    def times(self):
        """sample times of data"""
        if not hasattr(self, '_times'):
            self._times = np.arange(self.N) * self.dt
        return self._times

    @property
    def freqs(self):
        if not hasattr(self, '_freqs'):
            try:
                self._freqs = 1./self.wavelet.fourier_period(self.scales)
            except AttributeError:
                self._freqs = 1./self.scales
        return self._freqs

    def cwt(self, tdat):
        """cwt(tdat)
        Computes the continuous wavelet transform of ``tdat``, using
        the wavelet function and scales of the WaveletBasis, using FFT
        convolution as in T&C.  The FFT convolution is performed once
        at each wavelet scale, determining the frequecny resolution of
        the output.

        :param tdat: 1d array of real, time domain data. ``tdat`` must
            have length ``N``.
        :return wdat: 2d array of complex, wavelet domain data. ``wdat``
            has shape (M,N), where ``M`` is the number of scales used
            in the transform.
        """
        if len(tdat) != self.N:
            raise ValueError("tdat is not length N={:d}".format(self.N))
        dT = self.dt
        rdT = np.sqrt(dT)
        irs = self._inv_root_scales

        wdat = np.zeros((self.M, self.N), dtype=np.complex)

        for ii, s in enumerate(self.scales):
#            try:
#                L = 10 * self.wavelet.e_fold(s)/dT
#            except AttributeError:
#                L = 10 * s/dT
            L = 10 * s/dT
            if L > 2*self.N: L = 2*self.N
            ts = np.arange(-L/2, L/2) * dT  # generate wavelet data
            norm = rdT * irs[ii]
            wave = norm * self.wavelet(ts, s)
#            print( (ii, len(ts)) )
            wdat[ii, :] = _fftconv(tdat, wave, mode='same')

        return wdat

    def icwt(self, wdat):
        """icwt(wdat)
        Coputes the inverse continuous wavelet transform of ``wdat``,
        following T&Compo section 3.i.  Uses the wavelet function and
        scales of the parent WaveletBasis.

        :param wdat: shape (M,N) wavelet domain data, for M frequency
            scales and N time samples
        :return tdat: length N 1d array of real, time domain data
        """
        if not hasattr(self, '_recon_norm'):
            self._recon_norm = self._get_recon_norm()
        M = self.M
        N = self.N
        if wdat.shape != (M,N):
            raise ValueError("wdat is not shape ({0:d},{1:d})".format(M,N))
        irs = self._inv_root_scales
        tdat = np.einsum('ij,i->j', np.real(wdat), irs)
        tdat *= self._recon_norm
        return tdat

    def _get_scales(self):
        """_get_scales()
        Returns a list of scales in log2 frequency spacing for use in cwt.
        These are chosen such that ``s0`` is the smallest scale, ``dj`` is
        the scale step size, and log2(N) is the number of octaves.

            s_j = s0 * 2**(j*dj), j in [0,J]
            J = log2(N) / dj

        :return scales: array of scale parameters, s, for use in ``cwt``

        If the wavelet used contains a ``nyquist_scale()`` method, then
        the smallest scale will correspond to the Nyquist frequency and
        the largest will correspond to 1/(2*Tobs).
        """
        N = self.N
        dj = self.dj
        s0 = self.s0
        Noct = np.log2(N)+1  # number of scale octaves
        J = int(Noct / dj)  # total number of scales
        s = [s0 * 2**(j * dj) for j in range(-4, J)]
        return np.array(s)

    def _get_recon_norm(self):
        """_get_recon_norm()
        Computes the normalization factor for the icwt a.k.a. time domain
        reconstruction.
        Note this is not C_delta from T&C, this is a normalization constant
        such that in the ICWT sum*norm = tdat. This constant eliminates
        some factors which explicitly cancel in later calculations, for
        example dj*dt**0.5/Psi0.
        """
        N = self.N
        dt = self.dt
        scales = self.scales
        Psi_f = self.wavelet.freq  # f-domain wavelet as f(w_k, s)
        w_k = 2*np.pi * np.fft.rfftfreq(N, dt)  # Fourier freqs
        
        W_d = np.zeros_like(scales)
        for ii, sc in enumerate(scales):
            norm = np.sqrt(2*np.pi / dt)
            W_d[ii] = np.sum(Psi_f(w_k, s=sc).conj()) * norm
        W_d /= N
        return 1/np.sum(np.real(W_d))


class MorletWave(object):
    """Morlet-Gabor wavelet: a Gaussian windowed sinusoid
    w0 is the nondimensional frequency constant.  This defines
    the base frequency and width of the mother wavelet. For
    small w0 the wavelets have non-zero mean. T&C set this to
    6 by default.
    If w0 is set to less than 5, the modified Morlet wavelet with
    better low w0 behavior is used instead.
    """

    def __init__(self, w0=6):
        """initialize Morlet-Gabor wavelet with frequency constant w0
        """
        self.w0 = w0
        self._MOD = False
        if(w0 < 5.):
            self._MOD = True

    def __call__(self, *args, **kwargs):
        """default to time domain"""
        return self.time(*args, **kwargs)

    def time(self, t, s=1.0):
        """
        Time domain complex Morlet wavelet, centered at zero.
        :param t: time
        :param s: scale factor
        :return psi: value of complex morlet wavelet at time, t

        The wavelets are defined by dimensionless time: x = t/s

        For w0 >= 5, computes the standard Morlet wavelet:
            psi(x) = pi**-0.25 * exp(1j*w0*x) * exp(-0.5*(x**2))

        For w0 < 5, computes the modified Morlet wavelet:
            psi(x) = pi**-0.25 * (exp(1j*w0*x) - exp(-0.5*(x**2))) * exp(-0.5*(x**2))
        """
        t = np.asarray(t)
        w0 = self.w0
        x = t/s

        psi = np.exp(1j * w0 * x)  # base Morlet

        if self._MOD:
            psi -= np.exp(-0.5 * w0**2)  # modified Morlet

        psi *= np.exp(-0.5 * x**2) * np.pi**(-0.25)
        return psi

    def fourier_period(self, s):
        """The Fourier period of the Morlet wavelet with scale, s, given by:
            P = 4*pi*s / (w0 + sqrt(2 + w0**2))
        """
        w0 = self.w0
        return 4*np.pi*s / (w0 + np.sqrt(2 + w0**2))

    def nyquist_scale(self, dt=1):
        """s0 corresponding to the Nyquist period of wavelet
            s0 = 2*dt * (w0 + sqrt(2 + w0**2)) / (4*pi)
        for large w0 this is approximately dt*w0/pi
        """
        w0 = self.w0
        return dt * (w0 + np.sqrt(2 + w0**2)) / (2*np.pi)

    def freq(self, w, s=1.0):
        """
        Frequency domain representation of Morlet wavelet
        Note that the complex Morlet wavelet is real in the frequency domain.
        :param w: frequency
        :param s: scale factor
        :return psi: value of morlet wavelet at frequency, w

        Note there is no support for modified Morlet wavelets. The
        wavelets are defined by dimensionless frequency: y = w*s

        The standard Morlet wavelet is computed as:
            psi(y) = pi**-.25 * H(y) * exp((-(y-w0)**2) / 2)

        where H(y) is the Heaviside step function:
            H(y) = (y > 0) ? 1:0
        """
        w = np.asarray(w)
        H = np.zeros_like(w)  # Heaviside array for vector inputs
        H[w>0] = 1.
        
        w0 = self.w0
        y = w * s
        return H * np.pi**-.25 * np.exp(0.5 * (-(y - w0)**2))

    def e_fold(self, s):
        """The e-folding time for the Morlet wavelet.
        """
        return _SQRT2 * s


class PaulWave(object):
    """Paul wavelet of order m.
    By definition m is an integer, however in this implementation
    gamma functions are used in place of factorials, so non-integer
    values of m won't cause errors.
    """

    def __init__(self, m=4):
        """ initialize Paul wavelet of order m.
        """
        self.m = m

    def __call__(self, *args, **kwargs):
        """default to time domain"""
        return self.time(*args, **kwargs)

    def time(self, t, s=1.0):
        """
        Time domain complex Paul wavelet, centered at zero.
        :param t: time
        :param s: scale factor
        :return psi: value of complex Paul wavelet at time, t

        The wavelets are defined by dimensionless time: x = t/s

            psi(x) = (2*1j)**m * m! / (pi*(2m)!) * (1 - 1j*x)**-(m+1)
        """
        t = np.asarray(t)
        m = self.m
        x = t / s

        psi = (2**m * 1j**m * _gam(1+m)) / np.sqrt(np.pi * _gam(1 + 2*m))
        psi *= (1 - 1j*x) ** -(m+1)
        return psi

    def fourier_period(self, s):
        """The Fourier period of the Paul wavelet given by:
            P = 4*pi*s / (2*m + 1)
        """
        m = self.m
        return 4*np.pi*s / (2*m + 1)

    def nyquist_scale(self, dt=1):
        """s0 corresponding to the Nyquist period of wavelet
            s0 = 2*dt (2*m + 1)/(4*pi)
        """
        m = self.m
        return dt * (2*m+1)/(2*np.pi)

    def freq(self, w, s=1.0):
        """
        Frequency domain representation of Paul wavelet
        Note that the complex Paul wavelet is real in the frequency domain.
        :param w: frequency
        :param s: scale factor
        :return psi: value of morlet wavelet at frequency, w

        wavelets are defined by dimensionless frequency: y = w*s

        The Paul wavelet is computed as:
            psi(y) = 2**m / np.sqrt(m * (2*m-1)!) * H(y) * (y)**m * exp(-y)

        where H(y) is the Heaviside step function:
            H(y) = (y > 0) ? 1:0
        """
        w = np.asarray(w)
        H = np.zeros_like(w)  # Heaviside array for vector inputs
        H[w>0] = 1.

        m = self.m
        y = w * s

        psi = H * 2**m / np.sqrt(m * _gam(2*m))
        psi *= y**m * np.exp(-y)
        return psi

    def e_fold(self, s):
        """The e-folding time for the Morlet wavelet.
        """
        return s / _SQRT2
