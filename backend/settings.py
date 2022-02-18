from pathlib import Path
import os
from django.conf import settings
import django_heroku

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-i+h75hq+d0_9lmjtj=s)oe2ww5h48wekvij*k%2@1ibr1ix@3$'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'employee.apps.EmployeeConfig',
    'leave.apps.LeaveConfig',
    'attendance.apps.AttendanceConfig',
    'payroll.apps.PayrollConfig',
    'breaks.apps.BreaksConfig',
    'rest_framework',
    'corsheaders',
    'rest_framework.authtoken',
    # 'employee'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {'DIRS': [os.path.join(BASE_DIR, 'build')],
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
    },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }
# for deployemnt
DATABASES = {

    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'd5hu426pb8kq3n',
        'USER': 'ayfpitgorsdknx',
        'PASSWORD': '357fa52882acb97701e9f760fbafdc6ab08ad9629f59cbf2237103f639751930',
        'HOST': 'ec2-54-235-98-1.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        # 'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    # 'DEFAULT_AUTHENTICATION_CLASSES': [
    #     'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    #     'rest_framework_simplejwt.authentication.JWTAuthentication',
    #     'rest_framework.authentication.SessionAuthentication',
    #     'rest_framework.authentication.BasicAuthentication',
    #     # 'rest_framework.authentication.TokenAuthentication'
    # ],
}

JWT_AUTH = {
    'JWT_RESPONSE_PAYLOAD_HANDLER': 'backend.utils.my_jwt_response_handler'
}

# connecting react app with django
# CORS_ORIGIN_WHITELIST = [
#      'http://localhost:3000'
# ]
CORS_ORIGIN_ALLOW_ALL = True

# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


STATIC_URL = '/static/'
MEDIA_URL ='/images/'

STATICFILES_DIRS = [
            os.path.join(BASE_DIR,'static')
                    ]
MEDIA_ROOT = os.path.join(BASE_DIR,'static/images')

django_heroku.settings(locals())
