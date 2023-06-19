---
title: "[C++] wapPerspective "
date: 2023-06-19
last_modified_at: 2023-06-19
categories:
  - openCV
tags:
  - C++
  - OpenCV

published: true
toc: true
toc_sticky: true
---


> 목표
wapPerspective_demo 코드 분석 해보자

# 기본 사용 방법

### 명령인자 : right.jpg

### ![기본 결과](../../assets/img/OpenCV/OpenCV%20%EC%97%90%EC%A0%9C%20%ED%83%90%ED%97%98/Perspective.png)

기본 동작 

 키보드 C : 초기화 
 키보드 r : 1단계 초기화
 키보드 i : 회전
 키보드 q : 정료

# 기본 동작 스퀀스

1. 점 4개의 좌표를 구한다 (초기는 고정 좌표)
2. 4개의 좌표를 계산하여 넣는다. 
getPerspectiveTransform
warpPerspective


# 핵심 코드


vector< Point2f> midpoints(4); 포인트의 백터로 ROI 의 중앙 좌표 값을 의미한다..

vector< Point2f> dst_corners(4); 목표 포인트로 변환될 크기 좌표값을 의미한다.

getPerspectiveTransform(Inputarray , inputarray dst, int solveMethod) 
네 쌍의 해당 점에서 원근 변환을 계산합니다.

double norm(const Point_<_Tp>& pt)
{
    return std::sqrt((double)pt.x*pt.x + (double)pt.y*pt.y);
}

대각선 길이를 구합니다. 

void cv::warpPerspective	(	InputArray 	src,
OutputArray 	dst,
InputArray 	M,
Size 	dsize,
int 	flags = INTER_LINEAR,
int 	borderMode = BORDER_CONSTANT,
const Scalar & 	borderValue = Scalar() 
)	

원근 변환을 적용합니다.


```cpp

midpoints[0] = (roi_corners[0] + roi_corners[1]) / 2;
midpoints[1] = (roi_corners[1] + roi_corners[2]) / 2; midpoints[2] = (roi_corners[2] + roi_corners[3]) / 2;
midpoints[3] = (roi_corners[3] + roi_corners[0]) / 2; 



dst_corners[0].x = 0;
dst_corners[0].y = 0;

dst_corners[1].x = (float)norm(midpoints[1] - midpoints[3]);
dst_corners[1].y = 0;

dst_corners[2].x = dst_corners[1].x;
dst_corners[2].y = (float)norm(midpoints[0] - midpoints[2]);

dst_corners[3].x = 0;
dst_corners[3].y = dst_corners[2].y;

 Size warped_image_size = Size(cvRound(dst_corners[2].x), cvRound(dst_corners[2].y));

 Mat M = getPerspectiveTransform(roi_corners, dst_corners);

 Mat warped_image;
warpPerspective(original_image, warped_image, M, warped_image_size); // do perspective transformation
```




# 전체 코드 

```cpp
/**
@file warpPerspective_demo.cpp
@brief a demo program shows how perspective transformation applied on an image
@based on a sample code http://study.marearts.com/2015/03/image-warping-using-opencv.html
@modified by Suleyman TURKMEN
*/

#include "opencv2/imgproc.hpp"
#include "opencv2/imgcodecs.hpp"
#include "opencv2/highgui.hpp"
#include <iostream>

using namespace std;
using namespace cv;

static void help(char** argv)
{
    // print a welcome message, and the OpenCV version
    cout << "\nThis is a demo program shows how perspective transformation applied on an image, \n"
        "Using OpenCV version " << CV_VERSION << endl;

    cout << "\nUsage:\n" << argv[0] << " [image_name -- Default right.jpg]\n" << endl;

    cout << "\nHot keys: \n"
        "\tESC, q - quit the program\n"
        "\tr - change order of points to rotate transformation\n"
        "\tc - delete selected points\n"
        "\ti - change order of points to inverse transformation \n"
        "\nUse your mouse to select a point and move it to see transformation changes" << endl;
}

static void onMouse(int event, int x, int y, int, void*);
Mat warping(Mat image, Size warped_image_size, vector< Point2f> srcPoints, vector< Point2f> dstPoints);

String windowTitle = "Perspective Transformation Demo";
String labels[4] = { "TL","TR","BR","BL" };
vector< Point2f> roi_corners;
vector< Point2f> midpoints(4);
vector< Point2f> dst_corners(4);
int roiIndex = 0;
bool dragging;
int selected_corner_index = 0;
bool validation_needed = true;

int main(int argc, char** argv)
{
    help(argv);
    CommandLineParser parser(argc, argv, "{@input| right.jpg |}");

    string filename = samples::findFile(parser.get<string>("@input"));
    Mat original_image = imread(filename);
    Mat image;

    float original_image_cols = (float)original_image.cols;
    float original_image_rows = (float)original_image.rows;
    roi_corners.push_back(Point2f((float)(original_image_cols / 1.70), (float)(original_image_rows / 4.20)));
    roi_corners.push_back(Point2f((float)(original_image.cols / 1.15), (float)(original_image.rows / 3.32)));
    roi_corners.push_back(Point2f((float)(original_image.cols / 1.33), (float)(original_image.rows / 1.10)));
    roi_corners.push_back(Point2f((float)(original_image.cols / 1.93), (float)(original_image.rows / 1.36)));

    namedWindow(windowTitle, WINDOW_NORMAL);
    namedWindow("Warped Image", WINDOW_AUTOSIZE);
    moveWindow("Warped Image", 20, 20);
    moveWindow(windowTitle, 330, 20);

    setMouseCallback(windowTitle, onMouse, 0);

    bool endProgram = false;
    while (!endProgram)
    {
        if (validation_needed & (roi_corners.size() < 4))
        {
            validation_needed = false;
            image = original_image.clone();

            for (size_t i = 0; i < roi_corners.size(); ++i)
            {
                circle(image, roi_corners[i], 5, Scalar(0, 255, 0), 3);

                if (i > 0)
                {
                    line(image, roi_corners[i - 1], roi_corners[(i)], Scalar(0, 0, 255), 2);
                    circle(image, roi_corners[i], 5, Scalar(0, 255, 0), 3);
                    putText(image, labels[i].c_str(), roi_corners[i], FONT_HERSHEY_SIMPLEX, 0.8, Scalar(255, 0, 0), 2);
                }
            }
            imshow(windowTitle, image);
        }

        if (validation_needed & (roi_corners.size() == 4))
        {
            image = original_image.clone();
            for (int i = 0; i < 4; ++i)
            {
                line(image, roi_corners[i], roi_corners[(i + 1) % 4], Scalar(0, 0, 255), 2);
                circle(image, roi_corners[i], 5, Scalar(0, 255, 0), 3);
                putText(image, labels[i].c_str(), roi_corners[i], FONT_HERSHEY_SIMPLEX, 0.8, Scalar(255, 0, 0), 2);
            }

            imshow(windowTitle, image);

            midpoints[0] = (roi_corners[0] + roi_corners[1]) / 2;
            midpoints[1] = (roi_corners[1] + roi_corners[2]) / 2;
            midpoints[2] = (roi_corners[2] + roi_corners[3]) / 2;
            midpoints[3] = (roi_corners[3] + roi_corners[0]) / 2;

            dst_corners[0].x = 0;
            dst_corners[0].y = 0;
            dst_corners[1].x = (float)norm(midpoints[1] - midpoints[3]);
            dst_corners[1].y = 0;
            dst_corners[2].x = dst_corners[1].x;
            dst_corners[2].y = (float)norm(midpoints[0] - midpoints[2]);
            dst_corners[3].x = 0;
            dst_corners[3].y = dst_corners[2].y;

            Size warped_image_size = Size(cvRound(dst_corners[2].x), cvRound(dst_corners[2].y));

            Mat M = getPerspectiveTransform(roi_corners, dst_corners);

            Mat warped_image;
            warpPerspective(original_image, warped_image, M, warped_image_size); // do perspective transformation

            imshow("Warped Image", warped_image);
        }

        char c = (char)waitKey(10);

        if ((c == 'q') | (c == 'Q') | (c == 27))
        {
            endProgram = true;
        }

        if ((c == 'c') | (c == 'C'))
        {
            roi_corners.clear();
        }

        if ((c == 'r') | (c == 'R'))
        {
            roi_corners.push_back(roi_corners[0]);
            roi_corners.erase(roi_corners.begin());
        }

        if ((c == 'i') | (c == 'I'))
        {
            swap(roi_corners[0], roi_corners[1]);
            swap(roi_corners[2], roi_corners[3]);
        }
    }
    return 0;
}

static void onMouse(int event, int x, int y, int, void*)
{
    // Action when left button is pressed
    if (roi_corners.size() == 4)
    {
        for (int i = 0; i < 4; ++i)
        {
            if ((event == EVENT_LBUTTONDOWN) & ((abs(roi_corners[i].x - x) < 10)) & (abs(roi_corners[i].y - y) < 10))
            {
                selected_corner_index = i;
                dragging = true;
            }
        }
    }
    else if (event == EVENT_LBUTTONDOWN)
    {
        roi_corners.push_back(Point2f((float)x, (float)y));
        validation_needed = true;
    }

    // Action when left button is released
    if (event == EVENT_LBUTTONUP)
    {
        dragging = false;
    }

    // Action when left button is pressed and mouse has moved over the window
    if ((event == EVENT_MOUSEMOVE) && dragging)
    {
        roi_corners[selected_corner_index].x = (float)x;
        roi_corners[selected_corner_index].y = (float)y;
        validation_needed = true;
    }
}

```