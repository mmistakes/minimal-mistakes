---
title: "sqlalchemy 사용 정리"
categories:
  - sqlalchemy

tags: [sqlalchemy]
toc : true
comments: true
---
# 1. 속성 값 보기
```
    model = use_charger_box
    columns = [m.key for m in model.__table__.columns]
    print(columns)
```
# 2. 그룹 정리
```
    connector_joins = connector_joins.group_by(Connectorstatus.connector_pk)
```
# 3. 직접 명령 주기
```
session.execute("SELECT * FROM connector_status LEFT OUTER JOIN connector ON connector_status.connector_pk = connector.connector_pk GROUP BY connector_status.connector_pk")        
    print(test)
```

# 참고 링크
1. 속성 값 보기
https://stackoverflow.com/questions/6039342/how-to-print-all-columns-in-sqlalchemy-orm

2. 그룹 정리
https://ynzu-dev.tistory.com/entry/DB-GROUP-BY-%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%9D%98-%EB%A7%88%EC%A7%80%EB%A7%89%EC%B5%9C%EC%8B%A0-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0