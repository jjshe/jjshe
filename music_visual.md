






##AudioContext
> 包含各个 AudioNode 对象以及它们的联系的对象，可以理解为 audio 上下文对象。（类似于 canvas 的 getContext()）
> 绝大多数情况下，一个 document 中只能有一个 AudioContext
> 创建：

    var ac = new window.AudioContext();

    // 兼容写法
    var ac = new (window.AudioContext || window.webkitAudioContext)();

####属性：
* ```destination```

    > AudioDestinationNode 对象，所有的音频输出聚集地，相当于音频的硬件，所有的 AudioNode 都直接或间接连接到这里

* ```currentTime```

    > AudioContext 从创建开始到当前的时间（秒）

####方法：
* ```decodeAudioData(arrayBuffer, succ(buffer), err)```

    > 异步解码包含在 arrayBuffer 中的音频数据

* ```createBufferSource()```

    > 创建 audioBufferSourceNode 对象

* ```createAnalyser()```

    > 创建 AnalyserNode 对象，分析音频

* ```createGain()/createGainNode()```

    > 创建 GainNode 对象，调节音量

####audioBufferSourceNode 对象
> 表示内存中的一段音频资源，其音频数据存在于 AudioBuffer 中（其 buffer 属性）
> 创建：

    var buffersource = ac.createBufferSource();

* 属性：
    -  ```buffer```

        AudioBuffer 对象，表示要播放的音频资源数据

        + 子属性：```duration``` 该音频资源的时长（秒）

    - ```loop```

        是否循环播放，默认 ```false```

    - ```onended```

        可绑定音频播放完毕时调用的事件处理程序

* 方法：
    - 开始播放音频（参数可选）

            start/noteOn(when=ac.currentTime, offset=0, duration=buffer.duration-offset)

        + ```when``` 何时开始播放

        + ```offset``` 从音频的第几秒开始播放

        + ```duration``` 播放几秒


    - 结束播放音频（参数可选）

            stop/noteOff(when=ac.currentTime)


####GainNode 对象
> 改变音频音量的对象，会改变通过它的音频数据所有的 sample frame 的信号强度
> 创建：

    var gainNode = ac.createCain()/ac.createCainNode();

* 属性 ```gain```

    AudioParam 对象，通过改变其 ```value``` 值可以改变音频信号的强弱，默认的 ```value``` 属性值为 1，通常最小值为 0，最大值为 1，其 ```value``` 值也可以大于 1，小于 0


####AnalyserNode 对象
> 音频分析对象，它能实时的分析音频资源的频域和时域信息，但不会对音频流做任何处理。
> 创建：

    var analyser = ac.createAnalyser();

* 属性
    - ```fftSize```

        设置FFT（FFT是离散傅立叶变换的快速算法，用于将一个信号变换到频域）值的大小，用于分析得到频域，为32-2048之间2的整数次倍，默认为2048。试试得到的音频频域的数据个数为fftSize的一半

    - ```frequencyBinCount```

        FFT值的一半，即实时得到的音频频域的数据个数

* 方法
    - ```getByteFrequencyData(Unit8Array)```

        复制音频当前的频域数据（数量是frequencyBinCount）到Unit8Array（8位无符号整型类型化数据组）中
