#include <stdio.h>
#include <stdlib.h>
#include <ntsid.h>
#include <time.h>

#include "pack.h"


int
getVolume (PackingObject *pobj)
{
    return pobj->width * pobj->height;
}


/*
 * Comparison function used for sorting two packing objects.
 * A packing object is greater than another if it has a larger volume.
*/
int
pobjSort(const void *elem1, const void *elem2)
{
    PackingObject *f = (PackingObject*)elem1;
    PackingObject *s = (PackingObject*)elem2;

    const int v1 = getVolume(f);
    const int v2 = getVolume(s);

    if (v1 >= v2) {
        return -1;
    }
    else {
        return 1;
    }
}


PackingObject *
placeObject(PackingObject *packingObject,
            int *upToX,
            int *upToY,
            int *maxRowHeight)
{
    packingObject->xCoordinate = *upToX;
    packingObject->yCoordinate = *upToY;

    printf("Packed object %d at (x:%d, y:%d)\n",
           packingObject->id,
           *upToX,
           *upToY);

    *upToX += packingObject->width;

    int height = packingObject->height;
    // Only update the max row height if this object is taller than the current height
    if (height > *maxRowHeight) {
        *maxRowHeight = height;
    }

    return packingObject;
}



/*
 * Greedy algorithm to place the packing objects into the packing space.
 *
 * NOTE: assumes that a sensible default on xCoordinate and yCoordinate are set on packing objects.
 * If an object is not packed, this value will not be changed.
 */
PackingObject *
doPack(PackingSpace *packingSpace, PackingObject packingObjects[], size_t numObjects)
{
    clock_t begin = clock();

    int totalHeight = packingSpace->totalHeight;
    int totalWidth = packingSpace->totalWidth;

    printf("Packing space has dimensions (h:%d, w:%d)\n",
           totalHeight,
           totalWidth);

    // upToX and upToY track the current x and y coordinate for the candidate packing object
    int upToX = 0;
    int upToY = 0;

    // maxRowHeight tracks the maximum height of the current row
    int maxRowHeight = 0;


    qsort(packingObjects, numObjects, sizeof(*packingObjects), pobjSort);

    for (size_t i = 0; i < numObjects; i++) {
        int width = packingObjects[i].width;
        int height = packingObjects[i].height;

        // See if the object fits in the current row
        if (width + upToX <= totalWidth &&
            height + upToY <= totalHeight)
        {
            placeObject(&packingObjects[i],
                        &upToX,
                        &upToY,
                        &maxRowHeight);
        }
        else {
            upToY += maxRowHeight;
            maxRowHeight = 0;
            upToX = 0;

            if (width + upToX <= totalWidth &&
                height + upToY <= totalHeight)
            {
                placeObject(&packingObjects[i],
                            &upToX,
                            &upToY,
                            &maxRowHeight);
            }
        }
    }

    clock_t end = clock();
    double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;

    printf("Algorithm ran in %f seconds\n", time_spent);

    return packingObjects;
}