import { html } from "@microsoft/fast-element";
import { endTemplate, startTemplate } from "../patterns";
import { Option } from "./option";

/**
 * The template for the {@link @microsoft/fast-foundation#(Option:class)} component.
 * @public
 */
export const OptionTemplate = html<Option>`
    <template
        role="option"
        aria-selected="${x => x.selectedAttribute}"
        tabindex="${x => (x.disabled ? void 0 : x.focusable ? 0 : -1)}"
        class="${x => (x.selected ? "selected" : "")} ${x =>
            x.disabled ? "disabled" : ""}"
    >
        ${startTemplate}
        <span class="content" part="content">
            <slot></slot>
        </span>
        ${endTemplate}
    </template>
`;