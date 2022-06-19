import { composeWizardScene, handleMenuAction } from "./factory.js";
import { getKeyboard } from "../keyboards.js";
import scenes from "../scene-types.js";
import strapi from "../../modules/strapi.js";
import { sendMessage } from "../tg-helpers.js";

export const createAdminDialogeScene = composeWizardScene(
    (ctx) => {
        ctx.reply('Введите юзернейм', getKeyboard("back").reply())
        ctx.wizard.next()
    },
    async (ctx) => {
        if (ctx.message.text === ctx.config.BACK_BTN.BTN_TEXT) {
            ctx.scene.enter(scenes.MAIN)
            return
        }

        const [user] = await strapi.get("tg-users", { filters: {username: ctx.message.text} })
        console.log(user)
        
        if (!user) {
            ctx.reply(`Пользователь ${ctx.message.text} не найден`)
            return
        }

        ctx.reply("Напишите сообщение")
        ctx.session.adminChattingWith = user
        ctx.wizard.next()
    },
    async ctx => {
        if (ctx.message.text === ctx.config.BACK_BTN.BTN_TEXT) {
            ctx.session.adminChattingWith = undefined
            ctx.scene.enter(scenes.MAIN)
            return
        }

        await ctx.forwardMessage(ctx.session.adminChattingWith.uId)
    }
);
