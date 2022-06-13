import { getKeyboard } from "../keyboards.js";
import scenes from "../scene-types.js";
import { composeWizardScene, handleMenuAction } from "./factory.js";
import { sendMessage } from "../tg-helpers.js";

export const createMainScene = composeWizardScene(
    async (ctx) => {
        await sendMessage({
            ctx,
            message: ctx.config.START_TEXT, 
            keyboard: getKeyboard("main").reply(),
            imageStrapi: ctx.config.START_IMAGE
        })

        ctx.session.btnHistory = []
        ctx.session.history = ["MAIN"]

        ctx.wizard.next()
    },
    (ctx, done) => {
        const config = ctx.config

        handleMenuAction([
            {
                button: config.MAIN_KEYBOARD.REGRESSION_BTN,
                scene: scenes.REGRESSION
            },
            {
                button: config.MAIN_KEYBOARD.SELF_KNOWLEDGE_BTN,
                scene: scenes.SELF
            },
            {
                button: config.MAIN_KEYBOARD.HYPNO_BTN,
                scene: scenes.HYPNO
            }
        ])(ctx)
    }
)