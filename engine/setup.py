from glob import glob
from os.path import basename, splitext

from setuptools import setup, find_packages

requires = ['ortools', 'marshmallow']

setup(
    name='opa_engine',
    version='0.0.1',
    packages=find_packages('src'),
    package_dir={'': 'src'},
    py_modules=[splitext(basename(path))[0] for path in glob('src/*.py')],
    include_package_data=True,
    zip_safe=False,
    install_requires=requires,
    entry_points="""\
    [console_scripts]
    opa_engine = opa_engine.cli:cli
    """
)