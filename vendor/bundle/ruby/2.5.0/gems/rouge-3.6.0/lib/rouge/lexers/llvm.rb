# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    class LLVM < RegexLexer
      title "LLVM"
      desc 'The LLVM Compiler Infrastructure (http://llvm.org/)'
      tag 'llvm'

      filenames '*.ll'
      mimetypes 'text/x-llvm'

      string = /"[^"]*?"/
      identifier = /([-a-zA-Z$._][-a-zA-Z$._0-9]*|#{string})/

      state :basic do
        rule %r/;.*?$/, Comment::Single
        rule %r/\s+/, Text

        rule %r/#{identifier}\s*:/, Name::Label

        rule %r/@(#{identifier}|\d+)/, Name::Variable::Global
        rule %r/#\d+/, Name::Variable::Global
        rule %r/(%|!)#{identifier}/, Name::Variable
        rule %r/(%|!)\d+/, Name::Variable

        rule %r/c?#{string}/, Str

        rule %r/0[xX][a-fA-F0-9]+/, Num
        rule %r/-?\d+(?:[.]\d+)?(?:[eE][-+]?\d+(?:[.]\d+)?)?/, Num

        rule %r/[=<>{}\[\]()*.,!]|x/, Punctuation
      end

      builtin_types = %w(
        void float double half x86_fp80 x86mmx fp128 ppc_fp128 label metadata
      )

      state :types do
        rule %r/i[1-9]\d*/, Keyword::Type
        rule %r/#{builtin_types.join('|')}/, Keyword::Type
      end

      builtin_keywords = %w(
        begin end true false declare define global constant alignstack private
        landingpad linker_private internal available_externally linkonce_odr
        linkonce weak weak_odr appending dllimport dllexport common default
        hidden protected extern_weak external thread_local zeroinitializer
        undef null to tail target triple datalayout volatile nuw nsw nnan ninf
        nsz arcp fast exact inbounds align addrspace section alias module asm
        sideeffect gc dbg ccc fastcc coldcc x86_stdcallcc x86_fastcallcc
        arm_apcscc arm_aapcscc arm_aapcs_vfpcc ptx_device ptx_kernel cc
        c signext zeroext inreg sret nounwind noreturn noalias nocapture byval
        nest readnone readonly inlinehint noinline alwaysinline optsize ssp
        sspreq noredzone noimplicitfloat naked type opaque eq ne slt sgt sle
        sge ult ugt ule uge oeq one olt ogt ole oge ord uno unnamed_addr ueq
        une uwtable x personality allocsize builtin cold convergent
        inaccessiblememonly inaccessiblemem_or_argmemonly jumptable minsize
        no-jump-tables nobuiltin noduplicate nonlazybind noredzone norecurse
        optforfuzzing optnone writeonly argmemonly returns_twice safestack
        sanitize_address sanitize_memory sanitize_thread sanitize_hwaddress
        speculative_load_hardening speculatable sspstrong strictfp nocf_check
        shadowcallstack attributes
      )

      builtin_instructions = %w(
        add fadd sub fsub mul fmul udiv sdiv fdiv urem srem frem shl lshr ashr
        and or xor icmp fcmp phi call catch trunc zext sext fptrunc fpext
        uitofp sitofp fptoui fptosi inttoptr ptrtoint bitcast select va_arg ret
        br switch invoke unwind unreachable malloc alloca free load store
        getelementptr extractelement insertelement shufflevector getresult
        extractvalue insertvalue cleanup resume
      )

      state :keywords do
        rule %r/#{builtin_instructions.join('|')}/, Keyword
        rule %r/#{builtin_keywords.join('|')}/, Keyword
      end

      state :root do
        mixin :basic
        mixin :keywords
        mixin :types
      end
    end
  end
end
