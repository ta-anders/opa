from glob import glob
from os.path import basename, splitext

from setuptools import find_packages, setup

requires = [
    'django==2.0.3',
    'djangorestframework==3.7.7',
    'psycopg2==2.7.4',
    'djangorestframework-camel-case==0.2.0',
]


setup(
    name='opa',
    version='0.0.1',
    description='opa',
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Django',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: WSGI :: Application',
    ],
    author='Tom Anderson',
    author_email='',
    url='',
    keywords='web django djangorestframework',
    packages=find_packages('src'),
    package_dir={'': 'src'},
    py_modules=[splitext(basename(path))[0] for path in glob('src/*.py')],
    include_package_data=True,
    zip_safe=False,
    install_requires=requires,
)
