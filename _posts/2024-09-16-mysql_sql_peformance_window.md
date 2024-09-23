---
title: "[MySQL/MariaDB] Window Function"
excerpt: "MySQL, MariaDB 의 Window Function을 이용하여 간단히 쿼리 성능을 개선한 사례를 공유합니다."
#layout: archive
categories:
 - Mysql
tags:
  - [mysql, mariadb]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-09-16
last_modified_at: 2024-09-16
comments: true
---

### 💻 Azure MySQL Database, AWS RDS MariaDB로 이전을 마치다
--- 
<br/>
제가 근무하고 있는 환경은 멀티클라우드를 사용하고 있습니다. 그래서 AWS, Azure, GCP 를 모두 사용중입니다. 그런데 청천병력과 같은 소식이 등장했습니다.
바로 [Azure MySQL Single Database 의 지원 종료 소식인데요.](https://learn.microsoft.com/ko-kr/azure/mysql/migrate/whats-happening-to-mysql-single-server) 24년 9월 16일 이후에는 지원이 종료되는 이야기입니다. 이와 발맞춰 착실히(?) AWS와 GCP 로 이관을 하였으나 아직 남아있던 "레거시" DBMS 들의 이관작업이 남아 있었고 드디어 상황이 맞아 AWS MariaDB RDS로 이전을 완료하였습니다.(잘했다. 내자신.) 특히나 MySQL 5.7 에서 LTS 버전인  MariaDB 10.6 으로 옮긴 상황이라 드디어 안도할 수 있었습니다.

!["Azure MySQL Single Database 중단 소식"](https://github.com/user-attachments/assets/9e342aab-3afb-43f3-a7cf-6af2a117b596)



### 😲 아직 끝나지 않았다. 슬로우쿼리 발생
---
<br/>
하지만 안도한 순간도 잠시 슬로우 쿼리들이 감지되었고 RDS 로그를 수집하고 있던 키바나를 통해 현재 발생 중인 슬로우 쿼리들을 확인하게 되었습니다.

![슬로우쿼리 발생](https://github.com/user-attachments/assets/60bf43bd-f65c-44c3-8538-40fc7527550f)

역시나 ELK 로 모든 로그를 통합 관리해서 보니 손쉽게 확인할 수 있습니다. 분당 1회씩 꾸준히 발생 중 이었던 해당 쿼리는 동일한 패턴이었습니다.


### 🙈 문제 쿼리 확인

쿼리는 매우 간단한 쿼리이고 아래와 같습니다.

```
SELECT 컬럼....
FROM `job` INNER JOIN subJob ON job.id = subJob.jobId AND job.step = subJob.type 
INNER JOIN (SELECT MAX(id) AS LatestId FROM subJob GROUP BY jobId) A ON subJob.id = A.LatestId 
WHERE (job.status = 'P' AND subJob.status = 'S');
```


아래처럼 job과 subjob 테이블을 조인하고

``` FROM `job` INNER JOIN subJob ON job.id = subJob.jobId AND job.step = subJob.type ```


subjob 으로 INNER JOIN 을 한번 더 합니다. 응?

``` INNER JOIN (SELECT MAX(id) AS LatestId FROM subJob GROUP BY jobId) A ON subJob.id = A.LatestId  ```


subJob 의 id 는 해당 테이블의 pk 입니다. 아하... 가장 최근에 작업한 subjob 내역들을 job 별로 조인하려고 하는 것이네요. 불필요한 조인을 한번 더하기도 하고 subjob 의 건수가 300만여건이 넘다 보니 NL 조인으로는 좋은 성능을 내기는 어렵겠네요. 실행계획을 살펴보겠습니다.


| id  | select_type | table      | type   | possible_keys                              | key        | key_len | ref               | rows   | Extra                    |
| --- | ----------- | ---------- | ------ | ------------------------------------------ | ---------- | ------- | ----------------- | ------ | ------------------------ |
| 1   | PRIMARY     | job        | ref    | PRIMARY,idx_job_01                         | idx_job_01 | 11      | const             | 104    | Using index condition    |
| 1   | PRIMARY     | subJob     | ref    | PRIMARY,jobId,idx_subjob_01,idx_subjob_02  | jobId      | 5       | frozen.job.id     | 1      | Using where              |
| 1   | PRIMARY     | <derived2> | ref    | key0                                       | key0       | 5       | frozen.subJob.id  | 10     |                          |
| 2   | DERIVED     | subJob     | index  | (NULL)                                     | jobId      | 5       | (NULL)            | 3049799| Using index              |


조인을 위한 인덱스 최적화는 모두 되어 있습니다. job이 드라이빙 테이블이되고 subJob 이 후속테이블이구요. 그리고 jobId 별 id 의 최댓값을 뽑기 위해 DERIVED 처리된 결과 집합을 다음으로 조인하는 모습을 볼 수 있습니다.





/*

EXPLAIN 
SELECT *
FROM   backoffice b1
INNER JOIN (SELECT MAX(bitrate) AS maxBit,
		  contentid
	   FROM   backoffice
	   WHERE  j_createdat BETWEEN '2024-09-22 13:59:47' AND
				      '2024-09-23 13:59:47'
	   GROUP  BY contentid) b2
       ON b1.bitrate = b2.maxbit
	  AND b1.contentid = b2.contentid
ORDER  BY b1.j_createdat DESC; 



    id  select_type      table       type    possible_keys  key        key_len  ref                                    rows    Extra           
------  ---------------  ----------  ------  -------------  ---------  -------  -------------------------------------  ------  ----------------
     1  PRIMARY          b1          ALL     contentId      (NULL)     (NULL)   (NULL)                                 685802  Using filesort  
     1  PRIMARY          <derived2>  ref     key0           key0       306      frozen.b1.bitrate,frozen.b1.contentId  2                       
     2  LATERAL DERIVED  backoffice  ref     contentId      contentId  302      frozen.b1.contentId                    1       Using where     



Variable_name             Value    
------------------------  ---------
Handler_read_first        0        
Handler_read_key          1337446  
Handler_read_last         0        
Handler_read_next         718767   
Handler_read_prev         0        
Handler_read_retry        0        
Handler_read_rnd          668723   
Handler_read_rnd_deleted  0        
Handler_read_rnd_next     668724   



EXPLAIN
SELECT 
	`channelId`,
	`channelType`,
	`programTitle`,
	`programId`,
	`bitrate`,
	`contentId`,
	`contentNumber`,
	`mediaType`,
	`mediaVersion`,
	`transcodingType`,
	`mediaId`,
	`j_id`,
	`acquire`,
	`status`,
	`workflow`,
	`step`,
	`errCode`,
	`downloadUrl`,
	`playtime`,
	`fileSize`,
	`isDrm`,
	`isWatermark`,
	`modifiedDate`,
	`m_createdAt`,
	`m_updatedAt`,
	`j_CreatedAt`,
	`j_UpdatedAt`,
	`bitrate` AS 'maxBit',
	`contentId` AS 'contentid'
FROM (
SELECT *, ROW_NUMBER() OVER (PARTITION BY contentid ORDER BY bitrate DESC) AS rn
FROM backoffice bl
WHERE j_createdat BETWEEN '2024-09-22 08:19:47' AND '2024-09-23 13:59:47'
) bl
WHERE rn = 1
ORDER  BY j_createdat DESC; 



    id  select_type  table       type    possible_keys  key     key_len  ref     rows    Extra                         
------  -----------  ----------  ------  -------------  ------  -------  ------  ------  ------------------------------
     1  PRIMARY      <derived2>  ALL     (NULL)         (NULL)  (NULL)   (NULL)  685802  Using where; Using filesort   
     2  DERIVED      bl          ALL     (NULL)         (NULL)  (NULL)   (NULL)  685802  Using where; Using temporary  


Variable_name             Value   
------------------------  --------
Handler_read_first        0       
Handler_read_key          0       
Handler_read_last         0       
Handler_read_next         0       
Handler_read_prev         0       
Handler_read_retry        0       
Handler_read_rnd          840     
Handler_read_rnd_deleted  0       
Handler_read_rnd_next     669062  



#########################################################################################




SELECT subjob.status, COUNT(*)
FROM subjob
GROUP BY subjob.status;

/*
status  count(*)  
------  ----------
                 2
D            52052
F            99229
N                3
P                8
PAU            778
S          2903359
*/


SELECT job.status, COUNT(*)
FROM job 
GROUP BY job.status

/*
status  count(*)  
------  ----------
D            17329
F             6982
P               11
RE             149
S           935340
*/







EXPLAIN
SELECT *, job.id AS j_id, job.mediaVersion AS j_mediaVersion,
job.transcodingType AS j_transcodingType, job.status AS j_status,
job.errCode AS j_errCode, job.createdAt AS j_createdAt, job.updatedAt AS j_updatedAt,
subJob.id AS sj_id, subJob.type AS sj_type, subJob.mediaVersion AS sj_mediaVersion,
subJob.transcodingType AS sj_transcodingType, subJob.status AS sj_status,
subJob.errCode AS sj_errCode, subJob.createdAt AS sj_createdAt,
subJob.updatedAt AS sj_updatedAt FROM `job` INNER JOIN subJob ON job.id = subJob.jobId AND job.step = subJob.type INNER JOIN (SELECT MAX(id) AS LatestId FROM subJob GROUP BY jobId) A ON subJob.id = A.LatestId WHERE (job.status = 'P' AND subJob.status = 'S');





    id  select_type  table       type    possible_keys                              key         key_len  ref               rows     Extra                  
------  -----------  ----------  ------  -----------------------------------------  ----------  -------  ----------------  -------  -----------------------
     1  PRIMARY      job         ref     PRIMARY,idx_job_01                         idx_job_01  11       const             104      Using index condition  
     1  PRIMARY      subJob      ref     PRIMARY,jobId,idx_subjob_01,idx_subjob_02  jobId       5        frozen.job.id     1        Using where            
     1  PRIMARY      <derived2>  ref     key0                                       key0        5        frozen.subJob.id  10                              
     2  DERIVED      subJob      index   (NULL)                                     jobId       5        (NULL)            3049799  Using index            





Variable_name             Value    
------------------------  ---------
Handler_read_first        1        
Handler_read_key          310      
Handler_read_last         0        
Handler_read_next         3056161  
Handler_read_prev         0        
Handler_read_retry        0        
Handler_read_rnd          464      
Handler_read_rnd_deleted  0        
Handler_read_rnd_next     419572   


#############################################################################################




EXPLAIN
SELECT 
	job.id,
	job.mediaId,
	job.mediaVersion,
	job.ingest_id,
	job.bitrate,
	job.downloadUrl,
	job.workflow,
	job.priority,
	job.fileSize,
	job.playtime,
	job.transcodingType,
	job.step,
	job.status,
	job.reportSetId,
	job.height,
	job.errCode,
	job.acquire,
	job.isDrm,
	job.drmType,
	job.isWatermark,
	job.isCaption,
	job.isCommentary,
	job.isDescriptive,
	job.isDubbed,
	job.isSurround,
	job.isSubtitle,
	job.isMultiAudioTrack,
	job.isVr,
	job.vrType,
	job.isSubtitleBurntIn,
	job.hasOverlayLogo,
	job.overlayLogoUrl,
	job.previewDuration,
	job.createdAt,
	job.updatedAt,
	subjob.id,
	subjob.jobId,
	subjob.type,
	subjob.mediaVersion,
	subjob.transcodingType,
	subjob.status,
	subjob.errCode,
	subjob.createdAt,
	subjob.updatedAt,
	subjob.id AS 'LatestId',
	job.id AS j_id,
	job.mediaVersion AS j_mediaVersion,
	job.transcodingType AS j_transcodingType,
	job.status AS j_status,
	job.errCode AS j_errCode,
	job.createdAt AS j_createdAt,
	job.updatedAt AS j_updatedAt,
	subJob.id AS sj_id,
	subJob.type AS sj_type,
	subJob.mediaVersion AS sj_mediaVersion,
	subJob.transcodingType AS sj_transcodingType,
	subJob.status AS sj_status,
	subJob.errCode AS sj_errCode,
	subJob.createdAt AS sj_createdAt,
	subJob.updatedAt AS sj_updatedAt
FROM (
    SELECT *
         , ROW_NUMBER() OVER (PARTITION BY jobId ORDER BY id DESC) AS rn
    FROM subJob
) subJob
INNER JOIN job ON job.id = subJob.jobId 
AND job.step = subJob.type
WHERE subJob.rn = 1
AND job.status = 'P'
AND subJob.status = 'S';	


    id  select_type      table       type    possible_keys        key         key_len  ref                            rows    Extra                  
------  ---------------  ----------  ------  -------------------  ----------  -------  -----------------------------  ------  -----------------------
     1  PRIMARY          job         ref     PRIMARY,idx_job_01   idx_job_01  11       const                          116     Using index condition  
     1  PRIMARY          <derived2>  ref     key0                 key0        158      frozen.job.id,frozen.job.step  2       Using where            
     2  LATERAL DERIVED  subJob      ref     jobId,idx_subjob_01  jobId       5        frozen.job.id                  1       Using temporary        



Variable_name             Value   
------------------------  --------
Handler_read_first        0       
Handler_read_key          201     
Handler_read_last         0       
Handler_read_next         321     
Handler_read_prev         0       
Handler_read_retry        0       
Handler_read_rnd          464     
Handler_read_rnd_deleted  0       
Handler_read_rnd_next     216     





    id  select_type  table   type    possible_keys  key     key_len  ref     rows    Extra
------  -----------  ------  ------  -------------  ------  -------  ------  ------  -------------
     1  SIMPLE       job     ALL     (NULL)         (NULL)  (NULL)   (NULL)  866839  Using where



    id  select_type  table   type    possible_keys  key         key_len  ref     rows    Extra
------  -----------  ------  ------  -------------  ----------  -------  ------  ------  -----------------------
     1  SIMPLE       job     ref     idx_job_01     idx_job_01  11       const   1       Using index condition


*/



---
{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}