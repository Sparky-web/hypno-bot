import { composeWizardScene } from "./factory.js";
import { getKeyboard } from "../keyboards.js";
import scenes from "../scene-types.js";
import { sendAdminNotification } from "../tg-helpers.js";
import { sendMessage } from "../tg-helpers.js";

export const createOperatorScene = composeWizardScene(
    async (ctx) => {
        ctx.reply(ctx.session.btnClicked1.AFTER, getKeyboard(ctx, "back").reply())
        ctx.wizard.next()
    },
    async ctx => {
        const config = ctx.config

        if (ctx.message.text === config.BACK_BTN.BTN_TEXT) {
            if(ctx.session.btnHistory) ctx.session.btnHistory.pop()

            if (ctx.session.history?.length) {
                ctx.session.history.pop()
                ctx.scene.enter(ctx.session.history[ctx.session.history.length - 1] || scenes.MAIN)
            } else ctx.scene.enter(scenes.MAIN)

            await sendAdminNotification(ctx, "покинул чат")
            return
        }

        ctx.forwardMessage(config.adminId)
    }
);