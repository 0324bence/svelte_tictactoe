import type { Actions } from "./$types";

export const actions = {
    default: async event => {
        const data = await event.request.formData();

        const width = data.get("width");
        const height = data.get("height");
        const goal = data.get("goal");

        if (typeof width != "string" || typeof height != "string" || typeof goal != "string") return { success: false };

        return {
            success: true,
            data: {
                width: width.toString(),
                height: height.toString(),
                goal: goal.toString()
            }
        };
    }
} satisfies Actions;
