import {
    children,
    elements,
    html,
    ref,
    repeat,
    slotted,
    when,
} from "@microsoft/fast-element";
import { endTemplate, startTemplate } from "../patterns/start-end";
import { Select } from "./select";

/**
 * The template for the {@link @microsoft/fast-foundation#(Select:class)} component.
 * @public
 */
export const SelectTemplate = html<Select>`
    <template
        class="${x => x.readOnly && "readonly"}"
        open="${x => x.open}"
        label="${x => (x.value ? x.value : x.label)}"
        ${children({ property: "options", filter: elements("fast-option") })}
    >
        <button part="button" class="button" ${ref("button")}>
            ${startTemplate}
            <slot name="button-container">
                <span part="selected-value">
                    <slot name="selected-value">
                        ${x => (x.value ? x.value : "Choose one...")}
                    </slot>
                </span>
            </slot>
            <span class="indicator" part="indicator" ${ref("indicatorContainer")}>
                <slot name="indicator" ${slotted("indicator")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 7">
                        <path
                            d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
                        />
                    </svg>
                </slot>
            </span>
            ${endTemplate}
        </button>
        ${when(
            x => x.options,
            html<Select>`
                <fast-listbox
                    part="listbox"
                    class="listbox"
                    :hidden="${x => !x.open}"
                    ${ref("listbox")}
                >
                    <slot
                        ${slotted({
                            property: "options",
                            filter: elements("fast-option"),
                            flatten: true,
                        })}
                    ></slot>
                </fast-listbox>
            `
        )}
    </template>
`;
