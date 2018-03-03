from glob import glob
from os.path import basename, splitext

from setuptools import find_packages, setup

requires = [
    'alembic',
    'celery==4.1.0',
    'factory_boy',
    'marshmallow==2.13.4',
    'plaster_pastedeploy',
    'pyramid_celery==3.0.0',
    'pyramid >= 1.9a',
    'pyramid_debugtoolbar',
    'pyramid_jinja2',
    'pyramid_retry',
    'pyramid_tm',
    'psycopg2==2.7.3.1',
    'SQLAlchemy',
    'transaction',
    'zope.sqlalchemy',
    'waitress',
    'webargs'
]

tests_require = [
    'WebTest >= 1.3.1',  # py3 compat
    'pytest',
    'pytest-cov',
]

setup(
    name='opa',
    version='0.0.1',
    description='opa',
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Pyramid',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: WSGI :: Application',
    ],
    author='Tom Anderson',
    author_email='',
    url='',
    keywords='web pyramid pylons',
    packages=find_packages('src'),
    package_dir={'': 'src'},
    py_modules=[splitext(basename(path))[0] for path in glob('src/*.py')],
    include_package_data=True,
    zip_safe=False,
    extras_require={
        'testing': tests_require,
    },
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = opa:main',
        ],
        'console_scripts': [
            'initialize_opa_db = opa.scripts.initializedb:main',
        ],
    },
)
