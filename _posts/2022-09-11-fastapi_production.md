---
layout: single
title:  ""
---




```python
def get_application() -> FastAPI:
    settings = get_app_settings()

    settings.configure_logging()

    application = FastAPI(**settings.fastapi_kwargs)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_hosts,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.add_event_handler(
        "startup",
        create_start_app_handler(application, settings),
    )
    application.add_event_handler(
        "shutdown",
        create_stop_app_handler(application),
    )

    application.add_exception_handler(HTTPException, http_error_handler)
    application.add_exception_handler(RequestValidationError, http422_error_handler)

    application.include_router(api_router, prefix=settings.api_prefix)

    return application


app = get_application()

```
---
- `get_app_settings`


```python
from functools import lru_cache
from typing import Dict, Type

from app.core.settings.app import AppSettings
from app.core.settings.base import AppEnvTypes, BaseAppSettings
from app.core.settings.development import DevAppSettings
from app.core.settings.production import ProdAppSettings
from app.core.settings.test import TestAppSettings

environments: Dict[AppEnvTypes, Type[AppSettings]] = {
    AppEnvTypes.dev: DevAppSettings,
    AppEnvTypes.prod: ProdAppSettings,
    AppEnvTypes.test: TestAppSettings,
}


@lru_cache
def get_app_settings() -> AppSettings:
    app_env = BaseAppSettings().app_env
    config = environments[app_env]
    return config()

```



- `application`의 타입을 `dev`, `prod` ,`test`으로 주입받아서 configuration을 독립적으로 구성하는 기능

- `BaseAppSettings()`의 app_env의 값에 원하는 환경을 주입할 수 있다.


<details>
<summary>BaseAppSettings</summary>
<div markdown="1">

```python

from enum import Enum

from pydantic import BaseSettings


class AppEnvTypes(Enum):
    prod: str = "prod"
    dev: str = "dev"
    test: str = "test"


class BaseAppSettings(BaseSettings):
    app_env: AppEnvTypes = AppEnvTypes.prod

    class Config:
        env_file = ".env"

```

- pydantic `BaseSettings`


` AppEnvTypes` 은 Enum class로 prod, dev, test 값을 가진다.
- `BaseAppSettings는 pydantic의 BaseSettings를 상속받고 app_env의 기본값은 prod 타입이며 Config 내부 클래스에서 env_file 환경 변수를 읽는다.


- `BaseSettings`
- `env`
    
```
touch .env
echo APP_ENV=dev >> .env
echo DATABASE_URL=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB >> .env
echo SECRET_KEY=$(openssl rand -hex 32) >> .env
```



</div>
</details>


<details>
<summary>AppSettings</summary>
<div markdown="1">

```python
import logging
import sys
from typing import Any, Dict, List, Tuple

from loguru import logger
from pydantic import PostgresDsn, SecretStr

from app.core.logging import InterceptHandler
from app.core.settings.base import BaseAppSettings


class AppSettings(BaseAppSettings):
    debug: bool = False
    docs_url: str = "/docs"
    openapi_prefix: str = ""
    openapi_url: str = "/openapi.json"
    redoc_url: str = "/redoc"
    title: str = "FastAPI example application"
    version: str = "0.0.0"

    database_url: PostgresDsn
    max_connection_count: int = 10
    min_connection_count: int = 10

    secret_key: SecretStr

    api_prefix: str = "/api"

    jwt_token_prefix: str = "Token"

    allowed_hosts: List[str] = ["*"]

    logging_level: int = logging.INFO
    loggers: Tuple[str, str] = ("uvicorn.asgi", "uvicorn.access")

    class Config:
        validate_assignment = True

    @property
    def fastapi_kwargs(self) -> Dict[str, Any]:
        return {
            "debug": self.debug,
            "docs_url": self.docs_url,
            "openapi_prefix": self.openapi_prefix,
            "openapi_url": self.openapi_url,
            "redoc_url": self.redoc_url,
            "title": self.title,
            "version": self.version,
        }

    def configure_logging(self) -> None:
        logging.getLogger().handlers = [InterceptHandler()]
        for logger_name in self.loggers:
            logging_logger = logging.getLogger(logger_name)
            logging_logger.handlers = [InterceptHandler(level=self.logging_level)]

        logger.configure(handlers=[{"sink": sys.stderr, "level": self.logging_level}])
```

- fastapi property
    - debug = False # prod
    - docs_url = '/docs
    - openapi_prefix = ""
    - openarpi_url = "/openapi.json"
    - redoc_url = "/redoc"
    - title = ""
    - version = "0.0.0"

    - database_url =
    - max_connection_count = 10
    - min_connection_count = 10

    - secret_key: SecretStr

    - api_prefix = "/api"
    - jwt_token_prefix = "Token"
    - allowed_hosts = ['*']
    - logging_level = logging.INFO
    - loggers = ('uvicorn.asgi', 'uvicorn.access')
    


</div>
</details>

<details>
<summary>BaseAppSettings</summary>
<div markdown="1">
</div>
</details>


<details>
<summary>AppEnvTypes</summary>
<div markdown="1">
</div>
</details>


<details>
<summary>DevAppSettings</summary>
<div markdown="1">
</div>
</details>


<details>
<summary>ProdAppSettings</summary>
<div markdown="1">
</div>
</details>


<details>
<summary>TestAppSettings</summary>
<div markdown="1">
</div>
</details>

</div>
</details>
<details>
<summary>lru_cache</summary>
<div markdown="1">


</div>
</details>


---
### 로깅
- `configure_logging`
  - 


----
### Application Initialization
- `settings.fastapi_kwargs`


----
### MiddleWare
- `add_middleware`


----
### Event Handler

- `add_event_handler`
  - `create_start_app_handler`
  - `create_stop_app_handler`


----
### Exception Handler
- `add_exception_handler`
  - `HTTPException`
  - `RequestValidationError`


----
### API Router
- `include_router`