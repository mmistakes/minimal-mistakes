---
layout: single
title: "NestJS + Serverless 환경설정"
category: setting
tag: [setting]
author_profile: false
sidebar:
  nav: counts

---



### 1. NestJS 설치하기

```bash
npm install -g @nestjs/cli
nest new project-name
cd project-name
```



### 2. Serverless 설정

```bash
npm install g serverless
npm install @vendia serverless-express aws-lambda
npm install --save-dev @types/aws-lambda
```



```typescript
// /src/lambda.ts
import {} from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import {} from 'aws-lambda';
```





```yaml
# /serverless.yaml
service: nest serverless example

frameworkVersion: '3'

plugins:

provider:
	name: aws
	region: ap-northeast-2
	runtime: nodejs16.x
	
functions:
	api:
		handler: dist/lambda.handler
		events:
			http:
				method: any
				path: {proxy+}
```

