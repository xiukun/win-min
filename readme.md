## Using node cli
```sh
$ npm install -g win-min
全局安装win-min，在命令行中执行`win-min -r myfolder`.
```
传三个命令行参数(--rootpath或者-r是必选，其他都是可选的)
- rootpath: 当前目录下的文件夹名称，进程在其中执行.
- mode: 压缩模式，选项有`css `， `js`， `json`，`html`，`gzip`， `all`。默认 `all`.
- backups: boolean 用于确定在最小化时是否创建备份副本。默认 `false`.
```sh
$ node index -r myfolder -m gzip -b false
目录下的所有文件生成对应的xx.gz压缩文件.
```
```sh
$ node index -r myfolder --mode all
最小化目录下的所有js,css,json,html文件.
```
```sh
$ node index --rootpath=myfolder --mode=css
最小化目录下的所有CSS文件(扩展名为. CSS的文件).
```
```sh
$ node index --rootpath myfolder --mode js --backups true
最小化目录下的所有JavaScript文件(扩展名为.js的文件).
```
