---
layout: single
title:  "IU와 콘의 보드게임(프로그래머스 Lv5)"
categories : java
tag : [프로그래머스 Lv5]
search: true #false로 주면 검색해도 안나온다.
---

![문제1](../../images/2022-12-14-IU_and_boardgame/문제1.png){: width="100%" height="100%"}![문제2](../../images/2022-12-14-IU_and_boardgame/문제2.png){: width="100%" height="100%"}![문제3](../../images/2022-12-14-IU_and_boardgame/문제3.png){: width="100%" height="100%"}
코드의 알고리즘 설명![디테일1](../../images/2022-12-14-IU_and_boardgame/디테일1.png){: width="100%" height="100%"}![디테일2](../../images/2022-12-14-IU_and_boardgame/디테일2.png){: width="100%" height="100%"}![3](../../images/2022-12-14-IU_and_boardgame/3.png){: width="100%" height="100%"}![4](../../images/2022-12-14-IU_and_boardgame/4-16710148693171.png){: width="100%" height="100%"}![5](../../images/2022-12-14-IU_and_boardgame/5.png){: width="100%" height="100%"}![6](../../images/2022-12-14-IU_and_boardgame/6.png){: width="100%" height="100%"}![7](../../images/2022-12-14-IU_and_boardgame/7.png){: width="100%" height="100%"}![8](../../images/2022-12-14-IU_and_boardgame/8.png){: width="100%" height="100%"}![9](../../images/2022-12-14-IU_and_boardgame/9-16712683913721.png){: width="100%" height="100%"}![10](../../images/2022-12-14-IU_and_boardgame/10-167101387325813.png){: width="100%" height="100%"}![11](../../images/2022-12-14-IU_and_boardgame/11.png){: width="100%" height="100%"}![12](../../images/2022-12-14-IU_and_boardgame/12-1677587628025-1.png){: width="100%" height="100%"}![13](../../images/2022-12-14-IU_and_boardgame/13-16710795272175.png){: width="100%" height="100%"}![14](../../images/2022-12-14-IU_and_boardgame/14-16710793959501.png){: width="100%" height="100%"}

```java
import java.util.*;
class Solution 
{
    int v_length;    
    public int solution(int n, int[][] triangle, int[][] v) 
    {
        int answer = 0;
         switch(v.length) 
         {
            case 0:   
                answer = 1;
                break;                  
            case 1:
                answer = 3;
                break;
            default:
                 v_length = v.length;
                 answer=calc(triangle,v);
                 break;                      
         }
        return answer;
    }
    
    int calc(int[][] triangle, int[][] v)
    {        
        int[][] reit = {
                        {0,1,2},
                        {1,2,0},
                        {2,0,1}
                        };
        ArrayList<ArrayList<Integer>> nums = new ArrayList<ArrayList<Integer>>();

        //삼각형 두 꼭지점사이 직선의 방정식 구한다.             
        for(int i=0; i<3; i++)
        {  
            //아래 등호 왼쪽의 식에서 (double)로 분자의 형변환을 하지 않으면 나눗샘의 결과가 int가 됨으로
            //소수점 아래의 숫자는 없어지게 된다.
            double incli = (double)(triangle[reit[i][1]][1]-triangle[reit[i][0]][1])/(triangle[reit[i][1]][0]-triangle[reit[i][0]][0]);
            
            //y절편
            double y_itcp = triangle[reit[i][1]][1]-incli * triangle[reit[i][1]][0];
            
            //나눔샘의 분모가 될 값
            double denomi = Math.sqrt(Math.pow(incli, 2)+1);          

            HashMap<Integer,Double> loc_incli = new HashMap<Integer,Double>();
            for(int j=0; j<v_length; j++)
            {
                //직선과 한점사이의 거리(y)를 구한다.
                double y = Math.abs((incli*v[j][0]-v[j][1]+y_itcp)/denomi);                         
                double radius = Math.pow(triangle[reit[i][0]][0]-v[j][0], 2) + Math.pow(triangle[reit[i][0]][1]-v[j][1], 2);
                
                //한점에서 내린 수선의 발이 직선과 만날떄, 시작점으로 부터 떨어진 거리(x)를 구한다.
                double x = Math.sqrt(radius-Math.pow(y,2));                
                double deg;
                
                //traingle의 모서리 중 직각 이상의 각도를 가진경우를 대비해 아래와 같이 조건문을 달아준다.
                if(triangle[reit[i][0]][0]!=triangle[reit[i][1]][0])
                {
                    //두 꼭지점 사이를 이어주는 선분과, v에서 내린 수선의 발이
                    //만나는 점의 x좌표(x_on_line)를 구한다.
                    double x_on_line = v[j][0]-incli*((incli*v[j][0]-v[j][1]+y_itcp)/(Math.pow(incli, 2)+1));                     
                    if(triangle[reit[i][0]][0]<triangle[reit[i][1]][0])
                    {
                        //모서리의 각도가 둔각일 경우
                        if(x_on_line < triangle[reit[i][0]][0])
                        {
                            deg = 180-Math.toDegrees(Math.atan(y/x)); 
                        }
                        
                        //모서리의 각도가 직각일 경우
                        else if(x_on_line==triangle[reit[i][0]][0])
                        {
                            deg = 90;                             
                        }
                        
                        //모서리의 각도가 예각일 경우
                        else
                        { 
                            deg = Math.toDegrees(Math.atan(y/x));                         
                        }
                    }
                    else
                    {
                        //모서리의 각도가 둔각일 경우
                        if(x_on_line > triangle[reit[i][0]][0])
                        {
                            deg = 180-Math.toDegrees(Math.atan(y/x)); 
                        }
                        
                        //모서리의 각도가 직각일 경우
                        else if(x_on_line==triangle[reit[i][0]][0])
                        {
                            deg = 90;                             
                        }   
                        
                        //모서리의 각도가 예각일 경우
                        else
                        {
                            deg = Math.toDegrees(Math.atan(y/x));                               
                        }                    
                    }
                }
                else
                {
                    //두 꼭지점 사이를 이어주는 선분과, v에서 내린 수선의 발이
                    //만나는 점의 y좌표(y_on_line)를 구한다.                    
                    double y_on_line = v[j][1]+((incli*v[j][0]-v[j][1]+y_itcp)/Math.pow(denomi,2));                    
                    if(triangle[reit[i][0]][1]<triangle[reit[i][1]][1])
                    {
                        //모서리의 각도가 둔각일 경우
                        if(y_on_line < triangle[reit[i][0]][1])
                        {
                            deg = 180-Math.toDegrees(Math.atan(y/x)); 
                        } 
                        
                        //모서리의 각도가 직각일 경우
                        else if(y_on_line==triangle[reit[i][0]][1])
                        {
                            deg = 90;                             
                        }  
                        
                        //모서리의 각도가 예각일 경우
                        else
                        {
                            deg = Math.toDegrees(Math.atan(y/x));                         
                        }
                    }

                    else
                    {
                        //모서리의 각도가 둔각일 경
                        if(y_on_line > triangle[reit[i][0]][1])
                        {
                            deg = 180-Math.toDegrees(Math.atan(y/x)); 
                        } 
                        
                        //모서리의 각도가 직각일 경우
                        else if(y_on_line==triangle[reit[i][0]][1])
                        {
                            deg = 90;                             
                        } 
                        
                        //모서리의 각도가 예각일 경우
                        else
                        {
                            deg = Math.toDegrees(Math.atan(y/x));                               
                        }                    
                    }                    
                }
                loc_incli.put(j, deg);             
            }
            
            //loc_incli의 key값들을 어레이리스트에 담는다.
            ArrayList<Integer> keySetList = new ArrayList<>(loc_incli.keySet());
            
            //value값(각점의 기울기)이 작은 순서대로 key값들을 정렬한다.
            Collections.sort(keySetList, (c1, c2) -> (loc_incli.get(c1).compareTo(loc_incli.get(c2))));   

            //정렬된 key값을 배열에 원소로 넣는다.
            nums.add(keySetList);
        }        
        
        /*여기까지 실행후 nums출력
        [
            [0,1],
            [1,0],
            [1,0]
        ]  
        */
        
        int answer=0;
        
        //3개의 고무줄중 하나의 이동만으로 조건을 만족한 경우와, 
        //그 때(고무줄 하나의 이동만으로 조건을 만족한 경우) 두번째 고무줄 이동으로 만들수 있는 추가적인 모양 조사
        
        //첫번째 고무줄 이동
        for(int i=0; i<3; i++)
        { 
            answer +=1;

            //int next = (i+1)%3;
            int next = reit[i][1];
            int cur_loc_in_next = nums.get(next).indexOf(nums.get(i).get(v_length-1));
            answer += cur_loc_in_next;
        }
        
        //3개의 고무줄중 두개의 이동만으로 조건을 만족한 경우
        int fir;
        int sec;
        int third;
        int cur_loc_in_sec;
        int cur_loc_in_third;
        boolean escape;
        for(int i=1; i<3; i++)
        {
            fir = reit[i][0];
            sec = reit[i][1];

            //첫번째 고무줄 이동
            HashSet<Integer> first_in = new HashSet<>();
            for(int j=0; j<v_length-1; j++)
            {         
                first_in.add(nums.get(fir).get(j));                   
                cur_loc_in_sec = nums.get(sec).indexOf(nums.get(fir).get(j));    
            
                if(first_in.size() + cur_loc_in_sec >= v_length)
                {
                    HashSet<Integer> second_in = new HashSet<>();      
                    second_in.addAll(first_in);   
                    //두번재 고무줄 이동
                    for(int k=0; k<cur_loc_in_sec; k++)
                    {              
                        second_in.add(nums.get(sec).get(k));    
                        if(second_in.size() == v_length)
                        {
                            answer +=1;                
                        }                    
                    }
                }
            }  
        }
        
        fir = reit[0][0];   //fir = 0;
        sec = reit[0][1];   //sec = 1;
        third = reit[0][2]; //third = 2; 

        //두개 또는 세개의 고무줄 이동으로 조건을 만족하는 경우.
        //첫번째 고무줄 이동
        HashSet<Integer> first_in = new HashSet<>();
        for(int j=0; j<v_length-1; j++)
        {         
            first_in.add(nums.get(fir).get(j));    
            
            HashSet<Integer> second_in = new HashSet<>();  
            HashSet<Integer> second_in_c = new HashSet<>();  
            
            second_in.addAll(first_in);       
            cur_loc_in_sec = nums.get(sec).indexOf(nums.get(fir).get(j)); 
            
            //두번째 고무줄 이동
            for(int k=0; k<cur_loc_in_sec; k++)
            {              
                second_in.add(nums.get(sec).get(k));    
                second_in_c.add(nums.get(sec).get(k));                
                if(second_in.size() == v_length)
                {
                    answer +=1;                
                }
                
                cur_loc_in_third = nums.get(third).indexOf(nums.get(sec).get(k));     
                if(second_in.size() + cur_loc_in_third >= v_length)
                {  
                    HashSet<Integer> third_in = new HashSet<>();      
                    third_in.addAll(second_in);                           
                    //세번째 고무줄 이동
                    for(int l=0; l<cur_loc_in_third; l++)
                    {
                        third_in.add(nums.get(third).get(l)); 
                        if(!first_in.contains(nums.get(third).get(l)))
                        {                    
                            answer = (third_in.size() == v_length) ? answer+1 : answer;                
                        } 
                        
                        else if(second_in_c.contains(nums.get(third).get(l)))
                        {
                            break;                            
                        }
                    }
                }
            }
        } 
        return answer;
    }    
}
```

실행결과![실행결과1](../../images/2022-12-14-IU_and_boardgame/실행결과1.png){: width="100%" height="100%"}![실행결과2](../../images/2022-12-14-IU_and_boardgame/실행결과2.png){: width="100%" height="100%"}
