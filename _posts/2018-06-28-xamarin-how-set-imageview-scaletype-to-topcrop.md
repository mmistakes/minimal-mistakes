---
title: Hot to set ImageView ScaleType to TOPCROP
tags: [xamarin, android, csharp, ImageView]
---
Yesterday I have had the need to align TopCrop an image inside an Android ImageView. Unfortunally Android ImageView doesn't allow this crop style, so I have implemented it by my own starting from a java sample.

The following c# code implements a class that implements a special ImageView that align "TOPCROP" the image.

```csharp
using Android.Annotation;
using Android.Content;
using Android.Graphics;
using Android.Graphics.Drawables;
using Android.OS;
using Android.Util;
using Android.Widget;

namespace CaledosLab.Runner.Android.Controls
{
    public class TopCropInsideImageView : ImageView
    {
        public TopCropInsideImageView(Context context) : base(context)
        {
            init();
        }

        public TopCropInsideImageView(Context context, IAttributeSet attrs) : base(context, attrs)
        {
            init();
        }

        public TopCropInsideImageView(Context context, IAttributeSet attrs, int defStyleAttr) : base(context, attrs, defStyleAttr)
        {
            init();
        }

        [TargetApi(Value = (int)BuildVersionCodes.Lollipop)]
        public TopCropInsideImageView(Context context, IAttributeSet attrs, int defStyleAttr, int defStyleRes) : base(context, attrs, defStyleAttr, defStyleRes)
        {
            init();
        }

        protected override void OnLayout(bool changed, int left, int top, int right, int bottom)
        {
            base.OnLayout(changed, left, top, right, bottom);
            recomputeImgMatrix();
        }

        protected override bool SetFrame(int l, int t, int r, int b)
        {
            recomputeImgMatrix();
            return base.SetFrame(l, t, r, b);
        }

        private void init()
        {
            SetScaleType(ScaleType.Matrix);
        }

        private void recomputeImgMatrix()
        {
            Drawable drawable = Drawable;

            if (drawable == null)
            {
                return;
            }

            Matrix matrix = ImageMatrix;

            float scale;
            int viewWidth = Width - PaddingLeft - PaddingRight;
            int viewHeight = Height - PaddingTop - PaddingBottom;
            int drawableWidth = drawable.IntrinsicWidth;
            int drawableHeight = drawable.IntrinsicHeight;

            if (drawableWidth * viewHeight < drawableHeight * viewWidth)
            {
                scale = (float)viewHeight / (float)drawableHeight;
            }
            else
            {
                scale = (float)viewWidth / (float)drawableWidth;
            }

            matrix.SetScale(scale, scale);
            ImageMatrix = matrix;
        }
    }
}
```


Once added to your Xamarin.Android project, you can use it in your layout XML as show below

```xml
<CaledosLab.Runner.Android.Controls.TopCropInsideImageView
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:id="@+id/background_main"
    android:src="@drawable/background_main_01"
    />
```
