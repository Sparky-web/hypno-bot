import { Scenes } from 'telegraf'

import strapi from '../modules/strapi.js'
import scenes from './scene-types.js'
import LocalSession from 'telegraf-session-local'
import { getConfig } from '../modules/config.js'
import { createMainScene } from './scenes/main.js'
import { createSelfScene } from './scenes/self.js'
import { createRegressionScene } from './scenes/regression.js'
import { createHypnoScene } from './scenes/hypno.js'
import { createPaymentScene } from './scenes/payment.js'
import { createMoneyFreedoomScene } from './scenes/moneyFreedoom.js'
import { createPaymentWithMoneyFreedomScene } from './scenes/paymentWithMoneyFreedom.js'
import { createCourseScene } from './scenes/course.js'
import { createOperatorScene } from './scenes/operator.js'
import { handleAdminActions } from './tg-helpers.js'
import { createAdminDialogeScene } from './scenes/adminDialoge.js'

const userMiddleware = async (ctx, next) => {
    let [user] = await strapi.get("tg-users", { uId: ctx.chat.id })

    if (!user) user = await strapi.create("tg-users", {
        uId: ctx.chat.id,
        username: ctx.chat.username,
    })

    ctx.config = getConfig()

    ctx.user = user
    await next()
}

export const register = (bot) => {
    // to keep users in db
    bot.use(userMiddleware)

    const stage = new Scenes.Stage([
        createMainScene(scenes.MAIN),
        createSelfScene(scenes.SELF),
        createRegressionScene(scenes.REGRESSION),
        createHypnoScene(scenes.HYPNO),
        createPaymentScene(scenes.PAYMENT),
        createMoneyFreedoomScene(scenes.MONEY_FREEDOM),
        createPaymentWithMoneyFreedomScene(scenes.PAYMENT_WITH_MONEY_FREEDOM),
        createCourseScene(scenes.COURSE),
        createOperatorScene(scenes.OPERATOR),
        createAdminDialogeScene(scenes.ADMIN_DIALOGE)
    ])

    bot.use((new LocalSession({ database: 'db.json' })).middleware())
    bot.use(stage.middleware());
    bot.start(ctx => ctx.scene.enter(scenes.MAIN))
}

export default { register }