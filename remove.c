#include <stdio.h>

int main(){
    char c = 0;
    while((c = getchar()) != EOF){
        if (c == '\n' || c == '\t')
            ;
        else
            putchar(c);
    }
    return 0;
}