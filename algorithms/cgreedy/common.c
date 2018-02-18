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


int
getPackingObjectSortKey (PackingObject *pobj)
{
    int ret = -1;

    if (pobj->width > ret) {
        ret = pobj->width;
    }
    if (pobj->height > ret) {
        ret = pobj->height;
    }

    return ret;
}


/*
 * Comparison function used for sorting two packing objects.
 * Work in progress as to what measure is best to use here.
 * Generally want to put the 'difficult' packing objects in first.
*/
int
pobjSort(const void *elem1, const void *elem2)
{
    PackingObject *f = (PackingObject*)elem1;
    PackingObject *s = (PackingObject*)elem2;

    const int v1 = getPackingObjectSortKey(f);
    const int v2 = getPackingObjectSortKey(s);

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