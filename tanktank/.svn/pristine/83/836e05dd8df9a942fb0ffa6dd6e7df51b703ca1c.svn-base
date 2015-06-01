#介绍#
这是一个用来简化创建SAE Channel聊天室的Django App。该App分为 服务器端 和 JS客户端 两部分。  
演示地址：[channeltest](http://channeltest.sinaapp.com)
#服务器端#
###配置###
 1. 把"sae_channel"加入到settings.INSTALLED_APP中
 2. 把"sae_channel.context_processors.sae_channel_processor"加入到TEMPLATE_CONTEXT_PROCESSORS中
 3. 确认已安装"django.contrib.auth"及”django.contrib.contenttypes"
 4. 在**urls.py的末尾**加上 url(r'^', include('sae_channel.urls'));
 5. 确认Memcache服务及Channel服务已经开启

###介绍###
sae_channel采用django.Signal进行解耦合，将connected，disconnected以及message事件的接受与功能实现分离开来，只需在settings.py中配置好回调函数的路径即可完成你想要的功能。例如：

    #settings.py
    SAE_CHANNEL_MESSAGE_CALLBACKS = (
      'channel.on_message',
    )

    #channel.py
    from sae_channel import channel_callback
    
    @channel_callback
    def on_message(channel, message):
      channel.send_text('I received: '+message)
      
即可在接受到message事件时作出回应。

此外，sae_channel还封装了一个简易的聊天室的模型，将在下面做出介绍。

###文档###
####页面模式####
sae_channel区分了两种不同的页面模式（单页面及双页面）。单页面即**聊天**和**讨论组**实现在一个页面上（类似webqq）；双页面即**聊天**和**讨论组**的页面分离。页面配置代码为：
    
    #settings.py
    SAE_CHANNEL_IS_SINGLE_PAGE = True #默认为False

####channel种类####
sae_channel预定义了3种channel：普通、聊天和讨论组。它们定义在了sae_channel.consts中，分别为：ATTR_NORMAL, ATTR_CHAT, ATTR_DISCUSSION

 1. **ATTR_NORMAL** 可能应用场景：用户消息通知
 2. **ATTR_CHAT** 用户聊天
 3. **ATTR_DISCUSSION** 用户讨论组

####URL配置####
sae_channel需要使用者对需要使用channel的URL路径进行配置。所有的定义均在settings.py中。

 1. **SAE_CHANNEL_PATH_PREFIX** 一个元组类型。代表需要使用普通channel的页面前缀。默认为空。
 2. **SAE_CHANNEL_CHAT_PATHS** 一个元组类型。代表需要使用聊天channel的页面路径。默认为空。
 3. **SAE_CHANNEL_DISCUSSION_PATHS** 一个元组类型。代表需要使用讨论组channel的页面路径，当`SAE_CHANNEL_IS_SINGLE_PAGE = True`时不可用。默认为空。
 
例子：

    SAE_CHANNEL_PATH_PREFIX = ('/',)
    SAE_CHANNEL_CHAT_PATHS = （'/chat/',)

####回调####
sae_channel封装了connected（链接成功）、disconnected（断开连接）、message（接收到消息）、chat_message（接收到聊天消息）、discuss_message（接收到讨论组消息）共5种事件。使用者可以在任何地方写回调函数，只需在settings.py中配置即可：

    SAE_CHANNEL_CONNECTED_CALLBACKS = ...
    SAE_CHANNEL_MESSAGE_CALLBACKS = ...
    SAE_CHANNEL_DISCONNECTED_CALLBACKS = ...
    SAE_CHANNEL_CHAT_MESSAGE_CALLBACKS = ...
    SAE_CHANNEL_DISCUSS_MESSAGE_CALLBACKS = ...
    
其中每个都是元组类型，包含了回调函数的路径.每一个回调函数都需要channel_callback装饰器，如开头例子所示。
回调函数参数（其中第一个参数channel为sae_channel.core.Channel对象，包含了channel链接的一些信息）：

    def connected_callback(channel)
    
    def message_callback(channel, message)
    #message为接收到的消息
    
    def disconnected_callback(channel)
    
    def chat_message_callback(channel, message, to)
    #message为接收到的消息，to为一个User对象，表示接受者
    
    def discuss_message_callback(channel, discussion, message, to
    #discussion为一个sae_channel.models.Discussion对象，表示所在的讨论组，message，to含义同上
    
####Channel对象####
Channel对象封装了channel url管理的实现，位置在sae_channel.core中。介绍如下：

    def create_from_user(user, attr = consts.ATTR_NORMAL)
      #为一个user创建类型为attr的channel
      
    def create_from_username(username, attr = consts.ATTR_NORMAL)
      #为用户名为username的用户创建类型为attr的channel
      
    def create_from_user_id(user_id, attr = consts.ATTR_NORMAL)
      #为ID为user_id的用户创建类型为attr的channel
      
    def create_from_channel_name(channel_name)
      #从channel_name创建channel（内部使用）
      
    def send_text(text)
      #给channel发送文本
      
    def send_json(data)
      #给channel发送JSON数据
      
    property is_online
      #查看该channel是否在线（调用get_channel_url()后该值恒为True）
      
    def get_channel_url()
      #获得该channel的URL
      
####Discussion对象####
Discussion对象为一个Django Model，封装了讨论组的实现。介绍如下：

    supervisor = ForeignKey(User)   #管理员
    members = ManyToManyField(User) #组成员
    name = CharField()              #组名称
    
    def get_online_members()
      #返回在线成员的列表
      
    def boardcast(sender, message)
      #广播消息，sender为发送者，message为消息，返回无法接收（下线）的成员列表
      
####杂项####
    sae_channel.tools.send_message(sender, receiver, message)
    #sender, receiver为User对象，message为要发送的消息，若对方不在线则返回False，否则返回True

#JS客户端#
####介绍####
JS客户端分为initChannel.js和chat.js两部分，位于~/static/sae_channel/js/下。前者为channel做一些初始化工作，在使用了channel的页面必须加载；后者封装了聊天的功能。此外，channel SDK (//channel.sinaapp.com/api.js)需使用者自己加载。

####配置####
在使用了channel的页面需添加脚本`<script type="text/javascript">channelUrl = "{{channel_url}}";</script>`。该脚本需在所有js文件加载前执行。

####initChannel.js使用####
initChannel将会初始化channel并赋值给window.channelClient对象，还在原api.js的基础上增加了一些简化和安全措施。其中事件绑定不再用`channelClient.onmessage = ...;`的方式，而是采用`channelClient.bind('onmessage', function () {});`的方式，并且可以进行多次绑定。为了保险起见，绑定的代码最好放在document.ready中。

####chat.js使用####
chat.js的功能集成在了window.chat的命名空间中。有四个成员：User, Discussion, onchatmessage和ondiscussmessage。
 1. User，Discussion为构造函数，其成员都有一个send(message)方法，用于发送消息。
 2. ondiscussmessage(from, discussion, message)和onchatmessage(from, message)为回调函数，分别在**接受到讨论组消息和聊天消息时**被调用。参数discuss和from为Discussion对象和User对象。
