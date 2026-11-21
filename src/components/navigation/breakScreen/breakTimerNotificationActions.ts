type AddBreakTimeHandler = () => Promise<void>;

let addBreakTimeHandler: AddBreakTimeHandler | undefined;

export function setAddBreakTimeHandler(handler: AddBreakTimeHandler) {
    addBreakTimeHandler = handler;

    return () => {
        if (addBreakTimeHandler === handler) {
            addBreakTimeHandler = undefined;
        }
    };
}

export async function handleAddBreakTimeAction() {
    await addBreakTimeHandler?.();
}
