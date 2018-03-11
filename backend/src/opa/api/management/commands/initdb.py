import datetime
from django.core.management.base import BaseCommand
from django.db import transaction

from opa.api.models import Session, SessionConfiguration, PackingSpace, PackingObject, Algorithm


class Command(BaseCommand):
    help = 'A script to insert some basic data into the database'

    @transaction.atomic
    def _create_tags(self):
        session1 = Session(name='test 1', created_at=datetime.datetime.now())
        session2 = Session(name='test 2', created_at=datetime.datetime.now())

        Session.objects.bulk_create([session1, session2])

        algorithms = [
            Algorithm(name='cgreedy'),
            Algorithm(name='level_mip'),
            Algorithm(name='level_cp')
        ]

        Algorithm.objects.bulk_create(algorithms)

        config_1 = SessionConfiguration(session=session1, enable_tooltips=True, selected_algorithm=algorithms[0])
        config_2 = SessionConfiguration(session=session2, enable_tooltips=False, selected_algorithm=algorithms[0])
        SessionConfiguration.objects.bulk_create([config_1, config_2])

        PackingSpace.objects.create(height=500, width=600, session=session1)
        PackingSpace.objects.create(height=500, width=600, session=session2)

        PackingObject.objects.create(_width=100, _height=100, background_color='#000000', session=session1)

    def handle(self, *args, **options):
        self._create_tags()
