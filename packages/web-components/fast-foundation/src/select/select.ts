import { attr, observable } from "@microsoft/fast-element";
import { KeyCodes } from "@microsoft/fast-web-utilities";
import { FormAssociated } from "../form-associated/index";
import { StartEnd } from "../patterns/start-end";
import { applyMixins } from "../utilities/apply-mixins";
// import { Option } from "../option/option";
import { Listbox } from "../listbox/listbox";

/**
 * A Select Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#select | ARIA select }.
 *
 * @public
 */
export class Select extends FormAssociated<HTMLInputElement> {
    protected proxy: HTMLInputElement;
    @attr({ attribute: "readonly", mode: "boolean" })
    public readOnly: boolean; // Map to proxy element

    @attr({ attribute: "open", mode: "boolean" })
    @observable
    public open: boolean;
    private openChanged(oldValue, newValue) {
        this.updateButtonPartAttr();
        if (newValue) {
            this.listbox.focus();
        }
    }

    /**
     * The container for the indicator icon.
     * @internal
     */
    @observable
    public indicatorContainer: HTMLElement;

    @observable
    public indicator: Node[];

    @observable
    public defaultSlottedNodes: Node[];

    @observable
    public button: HTMLElement;

    @observable
    public selectedValue: HTMLElement;

    /**
     * @internal
     */
    public listbox: Listbox;
    private listboxChanged(oldValue, newValue) {
        if (this.$fastController.isConnected) {
            // this.applyListboxControllerCode();
        }
    }

    /**
     * @internal
     */
    @observable
    public slottedListbox: Listbox[];
    private slottedListboxChanged() {
        if (this.$fastController.isConnected) {
            // this.applyListboxControllerCode();
        }
    }

    /**
     * @internal
     */
    @observable
    public options: Element[];
    private optionsChanged() {
        if (this.$fastController.isConnected) {
            //
        }
    }

    // TODO: This needs to change to support multiple values
    public value: string = "Selected Value"; // Map to proxy element.
    public valueChanged(): void {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.value = this.value;
        }
    }

    public label: string = "Choose one...";

    private activeOptionIndex: number = 0;

    public connectedCallback(): void {
        super.connectedCallback();

        this.registerButtonSlotChange();

        // We won't get a slotchange for event for parts that were not replaced
        // by user-provided parts, so apply their controller code here.
        this.applyButtonControllerCode();
        // this.applyListboxControllerCode();

        this.addEventListener("keydown", this.keypressHandlerButton);
        this.addEventListener("focusout", this.handleFocusOut);
        this.updateForm();
    }

    private updateForm(): void {
        //
    }

    public keypressHandlerButton(e: KeyboardEvent): void {
        super.keypressHandler(e);

        switch (e.keyCode) {
            case KeyCodes.space:
            case KeyCodes.enter:
                e.preventDefault();
                this.open = !this.open;
                this.listbox.keydownHandler(e);
                break;

            default:
                break;
        }

        if (this.open) {
            e.stopPropagation();
            this.listbox.keydownHandler(e);
        }
    }

    public handleFocusOut = (e: FocusEvent): void => {
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!this.contains(relatedTarget) || this.isSameNode(relatedTarget)) {
            e.preventDefault();
            e.stopPropagation();
            this.open = false;
        }
    };

    /**
     * Set state to closed when focus moves away from the listbox ("light dismiss").
     * With this implementation, clicking on non-focusable content inside
     * the listbox will cause it to close (e.relatedTarget will be null).
     * This issue is not trivially remedied (see https://github.com/WICG/open-ui/issues/137).
     * But, this behavior works sufficiently well for the current set of examples.
     */
    public focusoutHandlerListbox = (e: FocusEvent): void => {
        const elementReceivingFocus = e.relatedTarget as HTMLElement;
        if (this.slottedListbox === undefined) {
            return;
        }
        if (
            this.open &&
            (!elementReceivingFocus ||
                !this.slottedListbox[0].contains(elementReceivingFocus))
        ) {
            this.open = false;
        }
    };

    public clickHandler = (e: MouseEvent): void => {
        console.log(e, this.listbox);
        if (!this.disabled && !this.readOnly) {
            this.open = !this.open;
            this.listbox.focus();
        }
    };

    public updateButtonPartAttr(): void {
        if (!this.$fastController.isConnected) {
            return;
        }
        this.button.setAttribute("aria-expanded", `${this.open}`);
    }

    /**
     * This will update the text that is in the select's
     * button by default that renders the selected value
     *
     * @param value - This is the value for the <option>
     */
    private updateSelectValue(value: string) {
        this.value = value;
        if (this.selectedValue) this.selectedValue.textContent = value;
    }

    /**
     * When the author leverages the slot we need to ensure that the a11y and
     * functionality that is tied to the given part still function as designed
     */
    public registerButtonSlotChange(): void {
        const slot = this.shadowRoot!.querySelector("slot[name=button-container]");
        if (slot) {
            slot.addEventListener("slotchange", () => {
                this.applyButtonControllerCode();
            });
        }
    }

    private applyButtonControllerCode(): void {
        if (this.button) {
            this.button.setAttribute("tabindex", "0");
            this.button.setAttribute("aria-haspopup", "listbox");
            this.button.setAttribute("aria-expanded", this.open ? "true" : "false");
            this.button.setAttribute("role", "button");

            this.button.addEventListener("click", this.clickHandler);
        }
    }
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface Select extends StartEnd {}
applyMixins(Select, StartEnd);
