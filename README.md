#include <math.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>
#include <limits.h>
#include <stdbool.h>

int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */
    int n,m;
    char a[101][20],b[1001][20];
    scanf("%d",&n);
    for(int i=0;i<n;i++){
        scanf("%s",&a[i]);
    }    
    int stat[n], swap=0;
    for(int i=0;i<n;i++)    stat[i]=0;
    scanf("%d",&m);
    if(m)   {
        scanf("%s",&b[0]);
        for(int j=0;j<n;j++){
            if(strcmp(a[j],b[0])==0){
                stat[j]=1;
                break;
            }
        }
    }
    
    for(int i=1;i<m;i++){
        scanf("%s",&b[i]);
        for(int j=0;j<n;j++){
            if(strcmp(a[j],b[i])==0 && stat[j]!=1){
                stat[j]=1;
                if(checkStatus(stat,n)==1){
                    swap++;
                    for(int k=0;k<n;k++){
                        stat[k]=0;
                    }
                }
                break;
            }
        }
    }
    
    printf("%d",swap);
    
    return 0;
}

int checkStatus(int stat[],int n){
    for(int i=0;i<n;i++){
        if(stat[i]==0) return 0;
    }
    return 1;
}