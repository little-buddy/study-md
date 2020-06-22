# git hooks 探索

### git hooks 种类

```
客户端
- pre-commint
		钩子在键入提交信息前运行
- prepare-commit-msg
		在启动提交信息编辑器之前，默认信息被创建之后运行
- commit-msg
		接收一个参数，此参数即上文提到的，存有当前提交信息的临时文件路径
- post-commit
		在整个提交过程完成后运行
		
服务端
- pre-commit
		检查每次的commit message是否有拼写错误，或是否符合某种规范
- pre-receive
		统一上传到远程库的代码的编码
- post-receive
		每当有新的提交的时候就通知项目成员
- post-receive
		把代码推送到生产环境
```



```
git init --bare --shared
	建立一个裸仓库并设置该仓库目录的组权限为可写
	裸仓库就是一个只包含 .git 子目录的内容，不包含其他资料
```

