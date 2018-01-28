CC=gcc
CFLAGS=-I.
DEPS = pack.h
OBJ = main.o pack.o

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

cgreedy: $(OBJ)
	gcc -o cgreedy.so $^ $(CFLAGS)

.PHONY : clean

clean :
	rm -f cgreedy *.o *.d
	rm -f cgreedy.so
