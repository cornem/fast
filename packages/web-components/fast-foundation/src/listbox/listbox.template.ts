import { elements, html, slotted } from "@microsoft/fast-element";
import { Listbox } from "./listbox";

/**
 * The template for the {@link @microsoft/fast-foundation#(Listbox:class)} component.
 * @public
 */
export const ListboxTemplate = html<Listbox>`
    <template
        role="listbox"
        aria-activedescendent="${x => (x.activeDescendent ? x.activeDescendent : null)}"
        aria-disabled="${x => x.disabled}"
        aria-readonly="${x => x.readOnly}"
        @blur="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
    >
        <slot
            ${slotted({
                property: "items",
                flatten: true,
                filter: elements("fast-option"),
            })}
        ></slot>
    </template>
`;
