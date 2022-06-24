import { getKeyboard } from "../keyboards.js";
import scenes from "../scene-types.js";
import { composeWizardScene, handleMenuAction } from "./factory.js";
import { selectLanguage, sendMessage } from "../tg-helpers.js";

export const createMainScene = composeWizardScene(
    async (ctx) => {
        await sendMessage({
            ctx,
            message: ctx.config.START_TEXT, 
            keyboard: getKeyboard(ctx, "main").reply(),
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
                button: config.MAIN_KEYBOARD.HYPNOTHERAPY_BTN,
                scene: scenes.HYPNOTHERAPY
            },
            {
                button: config.MAIN_KEYBOARD.RELATIONSHIP_BTN,
                scene: scenes.RELATIONSHIP
            },
            {
                button: config.MAIN_KEYBOARD.MONEY_FREEDOM_BTN,
                scene: scenes.MONEY_FREEDOM
            },
            {
                button: config.MAIN_KEYBOARD.CHOOSE_LOCALE,
                handler: async ctx => {
                    ctx.scene.leave()
                    selectLanguage(ctx)
                }
            }
        ])(ctx)
    }
)