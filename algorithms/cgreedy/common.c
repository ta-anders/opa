#include <stdio.h>
#include <stdlib.h>
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


SortKey *
getPackingObjectSortKey (PackingObject *pobj)
{
    SortKey *ret = malloc(sizeof(SortKey));

    int maxDim = -1;
    if (pobj->width > maxDim) {
        maxDim = pobj->width;
    }
    if (pobj->height > maxDim) {
        maxDim = pobj->height;
    }
    ret->maxDim = maxDim;

    int volume = getVolume(pobj);
    ret->volume = volume;

    ret->id = pobj->id;

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

    SortKey *k1 = getPackingObjectSortKey(f);
    SortKey *k2 = getPackingObjectSortKey(s);

    int comp1 = 0;
    int comp2 = 0;

    // Calculate the comparator to be used.
    // This is done lexicographically to break ties, first trying
    // to use the maxDim, then volume and then finally ID if all else is the same.
    if (k1->maxDim == k2->maxDim) {
        if (k1->volume == k2->volume) {
            comp1 = k1->id;
            comp2 = k2->id;
        }
        else {
            comp1 = k1->volume;
            comp2 = k2->volume;
        }
    }
    else {
        comp1 = k1->maxDim;
        comp2 = k2->maxDim;
    }

    free(k1);
    free(k2);

    if (comp1 > comp2) {
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