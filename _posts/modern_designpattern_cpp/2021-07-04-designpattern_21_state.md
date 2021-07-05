---
published: true
layout: single
title: "[MORDERN C++ DESIGN PATTERN] 21. State Pattern"
category: none
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  


//
//  main.cpp
//  EffectiveCppTest
//
//  Created by BYS on 2021/07/04.
//
#include <iostream>
#include <math>
#include <boost/msm/back/state_machine.hpp>
#include <boost/msm/front/state_machine_def.hpp>

namespace msm = boost::msm;
namespace mpl = boost::mpl;

using namespace boost::msm::front;

struct StartManagerStateMachine : state_machine_def<StartManagerStateMachine>
{
    
};

struct PreparingState : state<>
{
    
};

struct PreparedState : state<>
{
    // 진입
    template<class Event, class FSM>
    void on_entry(Event const& evt, FSM&)
    {
        
    }
    
    // on_exit (생략)
    
    // 상태가 전이된 시점에 호출
    template<class Event, class FSM, class SourceState, class TargetState>
    void operator()(Event const&, FSM&, SourceState&, TargetState&)
    {
        
    }
    
    // 보호 조건 : 위의 상태 전이 발생하기 전에 유효한 조건인지 검사하는 것
    template<class Event, class FSM, class SourceState, class TargetState>
    bool operator()(Event const&, FSM& fsm, SourceState&, TargetState&)
    {
        return false;
    }
};

struct StartingState : state<>
{
    
};

struct StartedState : state<>
{
    
};

struct ShutdowningState : state<>
{
    
};

struct ShutdownedState : state<>
{
    
};

// Bost.MSM은 MPL을 사용한다
// 그중에서도 mpl::vector를 사용하여 상태 전이 테이블을 만든다.
// mpl::vector에 저장될 각 항목은 row로 감싸지며 row 안에서의 항목들은 순서대로 아래와 같은 의미를 가진다.

// 출발 상태
// 상태 전이
// 도착 상태
// 부가적인 동작(옵션)
// 부가적인 보호 조건(옵션)

struct tansition_table : mpl::vector<
    row<PreparedState, PreparingState, StartingState>
>{};

int main(int argc, const char* argv[])
{
    return 0;
}
