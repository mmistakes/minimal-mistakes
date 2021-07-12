---
title: "KVM의 Bridege를 OVS-switch로 바꾸기"
date: 2021-03-23 13:12
categories: jekyll update
---

일반적인 OpenStack 설치에서, 특히 kolla-anible 또는 openstack-anible을 통해 롤아웃되는 경우 추가 구성없이 작동하는 네트워크 인터페이스가 필요하다. 그런 다음 배포 도구는 open-vswitch 또는 linux-bridge를 이러한 인터페이스에 연결한다. open-vswitch는 물리적 인터페이스가 이후 프로세스에 있는지 확인하지 않는다.(그래서 이것은 kolla에 영향을 미친다)

KVM은 리눅스 커널 기반의 가상화 시스템이다. KVM 을 이용하면 네트워크도 가상화를 해주는데, 이는 KVM 의 네트워크 가상화는 Bridege 네트워크를 이용하도록 되어 있다.

![가상화된 네트워킹 인프라](./img/가상화된 네트워킹 인프라.jpg)

Figure1. 가상화된 네트워킹 인프라.(Ibm develop works 참조)

위 그림은 KVM 하이퍼바이저의 가상 네트워킹을 보여준다. 네트워크 가상화를 하이퍼바이저내에서 이루어지다보니 가상 시스템을 모아놓은 상태에서 전체 네트워킹을 설정하고 변경하기가 쉽지가 않게 된다. 가상 네트워킹을 관리하기 좀 더 쉽게 하이퍼바이저내에서 빼내서 가상 네트워킹을 가능하도록 한다면 어떨까. OpenvSwitch 가 이것을 가능하게 해준다.



You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:



​```python
def print_hi(name):
  print("hello", name)
print_hi('Tom')
​```

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
