#local_settings.py :
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', 
        'NAME': 'ems',                      
        'USER': 'postgres',                     
        'PASSWORD': 'admin12345',                  
        'HOST': 'localhost',                      
        'PORT': '5432',                      
    }
}