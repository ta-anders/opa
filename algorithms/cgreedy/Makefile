CC=gcc
CFLAGS=-I.
DEPS = common.h firstFit.h shelf.h
OBJ = main.o firstFit.o shelf.o common.o

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

cgreedy: $(OBJ)
	gcc -o cgreedy.so $^ $(CFLAGS)

.PHONY : clean

clean :
	rm -f cgreedy *.o *.d
	rm -f cgreedy.so
