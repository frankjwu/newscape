 1 /* The authors of this work have released all rights to it and placed it
 2 in the public domain under the Creative Commons CC0 1.0 waiver
 3 (http://creativecommons.org/publicdomain/zero/1.0/).
 4 
 5 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 6 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 7 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 8 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 9 CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
10 TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
11 SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
12 
13 Retrieved from: http://en.literateprograms.org/Quicksort_(JavaScript)?oldid=19196
14 */
15 
16 Array.prototype.swap=function(a, b)
17 {
18  var tmp=this[a];
19  this[a]=this[b];
20  this[b]=tmp;
21 }
22 
23 function partition(array, begin, end, pivot)
24 {
25  var piv=array[pivot];
26  array.swap(pivot, end-1);
27  var store=begin;
28  var ix;
29  for(ix=begin; ix<end-1; ++ix) {
30      if(array[ix]<=piv) {
31          array.swap(store, ix);
32          ++store;
33      }
34  }
35  array.swap(end-1, store);
36 
37  return store;
38 }
39 
40 function qsort(array, begin, end)
41 {
42  if(end-1>begin) {
43      var pivot=begin+Math.floor(Math.random()*(end-begin));
44 
45      pivot=partition(array, begin, end, pivot);
46 
47      qsort(array, begin, pivot);
48      qsort(array, pivot+1, end);
49  }
50 }
51 
52 function quick_sort(array)
53 {
54  qsort(array, 0, array.length);
55 }
56 
57 function dosort(form)
58 {
59  var array=form.unsorted.value.split(/ +/);
60 
61  quick_sort(array);
62 
63  form.sorted.value=array.join(' ');
64 
65 
66 }