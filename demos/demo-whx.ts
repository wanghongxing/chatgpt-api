import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { ChatGPTUnofficialProxyAPI } from '../src'

dotenv.config()

/**
 * Demo for testing conversation support using a reverse proxy which provides
 * access to the unofficial ChatGPT API.
 *
 * ```
 * npx tsx demos/demo-reverse-proxy.ts
 * ```
 */
async function main() {
  // WARNING: this method will expose your access token to a third-party. Please be
  // aware of the risks before using this method.
  const api = new ChatGPTUnofficialProxyAPI({
    // optionally override the default reverse proxy URL (or use one of your own...)
    // apiReverseProxyUrl: 'https://chat.duti.tech/api/conversation',
    // apiReverseProxyUrl: 'https://gpt.pawan.krd/backend-api/conversation',

    accessToken: process.env.OPENAI_ACCESS_TOKEN,
    debug: false
  })

  const prompt = `下面我给你一些原文和人工标注的训练样本，你可以学习训练下，然后你可以帮我自动标注更多的文本，回复的时候不用重复原文、不用举例说明。
  下面是我提供的原文和人工标注的训练样本：
  原文：因为着急提现车，通过朋友介绍来到店里，找到销售高衡经理，微信时候说的价格非常清楚，对于一个小白很友好，也经过多方比较，最后到店直接订车，因为当天他太忙了，所以介绍同事给我，这位经理给的价格也合适，介绍的也到位！很愉快的一次体验！除了店里人太多……没别的毛病！全款已付，坐等周一提车！。标注结果：价格、合适、介绍、到位、
  原文：贵阳宝翔行孟关宝马店给人进店第一感觉干净整洁  服务热情，对客户的需求能给出专业的解答，第一时间给客户解决问题，给客户提供高品质服务。。标注结果：干净整洁 、服务、热情、解答、解决问题、高品质服务  
  `

  let res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  })

  const prompt2 = `请把下面的原文帮我标注出结果：
  销售真的不行，大家要注意了！各种套路，说的话出尔反尔！毫无信誉可言
  非常帅气，刚推出发布的L9，满足车辆的所有幻想，理想车型的天花板，选择准没错，店里有展车有试驾车，体验起来吧朋友们，只要你敢体验，就会心动，店里服务特别到位，可以去找产品专家鹏阳，试驾服务绝对到位，来来来，飙起来
  家里换第四辆车，终于选择ABB了。  老公研究后决定奥迪最合适，于是年初在这里喜提新车。  展厅就是标准的4S店该有的样子，名牌的B格当然是满满的。店员们也是盘靓条顺，服务挺热情的。  车子开了半年多，车况感觉良好。  这次是来首保，也是第一次在4S店吃了下午茶。
    `

  res = await oraPromise(
    api.sendMessage(prompt2, {
      conversationId: res.conversationId,
      parentMessageId: res.id
    }),
    {
      text: prompt2
    }
  )
  console.log('\n' + res.text + '\n')

  const prompt3 = `请把下面的原文帮我标注出结果：
  第一次体验宝马的服务，全程都非常满意[强]尤其销售经理闫进宝，真是特别靠谱[强]大年初二看车，别的4s店都很萧条，只有宝马很有人气，小闫全程热情招待，让人特别舒服！所以，在大年初五火速决定下单，不料手续比较多，耽误了小闫回家跟家人吃饺子，但小闫全程都热情服务，认真的一遍一遍给我们梳理流程，特别细致！前后等了20多天，车辆就到了，全程特别省心，不用惦记，每一个环节小闫都周到提醒，告知进度！今天喜提新车，小闫忙前忙后4个小时，连午饭都没来得及吃，还给我们准备了礼物鲜花真是有温度的服务[强]必须点赞[强]
  服务特别好，周到、细心、检修速度快，态度绝对要点赞。
  态度太差了，毫无服务可言。把客人当透明的，要求着他们带我看车。  
  `

  res = await oraPromise(
    api.sendMessage(prompt3, {
      conversationId: res.conversationId,
      parentMessageId: res.id
    }),
    {
      text: prompt3
    }
  )
  console.log('\n' + res.text + '\n')

  const prompt4 = `请分析如下评价的情感，回答正向、负向就行。评价如下：
  第一次体验宝马的服务，全程都非常满意[强]尤其销售经理闫进宝，真是特别靠谱[强]大年初二看车，别的4s店都很萧条，只有宝马很有人气，小闫全程热情招待，让人特别舒服！所以，在大年初五火速决定下单，不料手续比较多，耽误了小闫回家跟家人吃饺子，但小闫全程都热情服务，认真的一遍一遍给我们梳理流程，特别细致！前后等了20多天，车辆就到了，全程特别省心，不用惦记，每一个环节小闫都周到提醒，告知进度！今天喜提新车，小闫忙前忙后4个小时，连午饭都没来得及吃，还给我们准备了礼物鲜花真是有温度的服务[强]必须点赞[强]
  `

  res = await oraPromise(
    api.sendMessage(prompt4, {
      conversationId: res.conversationId,
      parentMessageId: res.id
    }),
    {
      text: prompt4
    }
  )
  console.log('\n' + res.text + '\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
