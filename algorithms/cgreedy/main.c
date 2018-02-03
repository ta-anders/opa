#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#include "shelf.h"
#include "firstFit.h"


int
main(int argc, char** argv)
{
    if (argc <= 1) {
        printf("A number of objects is required...\n");
        return 1;
    }

    const int numObjects = atoi(argv[1]);

    PackingSpace packingSpace = {500, 450};

    srand(time(NULL));

    PackingObject packingObjects[numObjects];
    for (unsigned int i = 0; i < numObjects; i++) {
        int height = (rand() % 100) + 1;
        int width = (rand() % 100) + 1;

        packingObjects[i].height = height;
        packingObjects[i].width = width;
        packingObjects[i].id = i;

        packingObjects[i].xCoordinate = -1;
        packingObjects[i].yCoordinate = -1;
    }

    doFirstFitPack(&packingSpace, packingObjects, numObjects);
//    doShelfPack(&packingSpace, packingObjects, numObjects);

    return 0;
}
