import { composeWizardScene, handleMenuAction } from "./factory.js";
import { getKeyboard } from "../keyboards.js";
import { handleBackBtn, sendMessage } from "../tg-helpers.js";
import scenes from "../scene-types.js";

export const createCourseScene = composeWizardScene(
    async (ctx) => {
        await sendMessage({
            ctx,
            message: ctx.config.MONEY_FREEDOOM_KEYBOARD.COURSE_BTN.AFTER, 
            keyboard: getKeyboard("course").reply(),
            imageStrapi: ctx.config.MONEY_FREEDOOM_KEYBOARD.COURSE_BTN.IMAGE
        })
        ctx.wizard.next()
    },
    (ctx) => {
        const config = ctx.config

        handleMenuAction([
            {
                button: config.COURSE_KEYBOARD.GROUP_BTN,
                handler: (ctx) => {
                    ctx.session.btnClicked = config.COURSE_KEYBOARD.GROUP_BTN
                    ctx.scene.enter(scenes.PAYMENT)
                }
            },
            {
                button: config.COURSE_KEYBOARD.VIP_BTN,
                handler: (ctx) => {
                    ctx.session.btnClicked = config.COURSE_KEYBOARD.VIP_BTN
                    ctx.scene.enter(scenes.PAYMENT)
                }
            },
            {
                button: config.COURSE_KEYBOARD.HYPNO500_BTN,
                handler: ctx => {
                    ctx.session.btnClicked = config.COURSE_KEYBOARD.HYPNO500_BTN
                    ctx.scene.enter(scenes.PAYMENT)
                }
            },
            handleBackBtn(ctx)
        ])(ctx)
    }
);