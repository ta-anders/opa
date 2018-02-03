#include <stdio.h>
#include "common.h"


/*
 * Returns the volume of a packing object.
 * Given by width times height (they are all rectangles for now).
*/
int
getVolume (PackingObject *pobj)
{
    return pobj->width * pobj->height;
}


/*
 * Comparison function used for sorting two packing objects.
 * Returns:
 *     -1 if p1 has greater volume than p2
 *     1 if p1 has lesser volume than p2
 *     0 if p1 has the same volume as p2
*/
int
pobjSort(const void *elem1, const void *elem2)
{
    PackingObject *f = (PackingObject*)elem1;
    PackingObject *s = (PackingObject*)elem2;

    const int v1 = getVolume(f);
    const int v2 = getVolume(s);

    if (v1 == v2) {
        return 0;
    }
    else if (v1 > v2) {
        return -1;
    }
    else {
        return 1;
    }
}


PackingObject *
placeObject(PackingObject *packingObject,
            int xCoordinate,
            int yCoordinate)
{
    packingObject->xCoordinate = xCoordinate;
    packingObject->yCoordinate = yCoordinate;

    printf("Packed object %d at (x:%d, y:%d)\n",
           packingObject->id,
           xCoordinate,
           yCoordinate);

    return packingObject;
}