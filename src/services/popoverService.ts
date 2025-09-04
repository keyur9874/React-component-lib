export interface PopoverConfig {
  zIndex?: number;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  destroyOnHidden?: boolean;
  fresh?: boolean;
}

class PopoverService {
  private config: PopoverConfig = {
    zIndex: 1000,
    getPopupContainer: () => document.body,
    destroyOnHidden: false,
    fresh: false,
  };

  private activePopovers = new Set<string>();

  setConfig(config: Partial<PopoverConfig>) {
    this.config = { ...this.config, ...config };
  }

  getConfig(): PopoverConfig {
    return { ...this.config };
  }

  registerPopover(id: string) {
    this.activePopovers.add(id);
  }

  unregisterPopover(id: string) {
    this.activePopovers.delete(id);
  }

  getActivePopovers(): string[] {
    return Array.from(this.activePopovers);
  }

  getNextZIndex(): number {
    return this.config.zIndex! + this.activePopovers.size;
  }

  createPopupContainer(triggerNode: HTMLElement): HTMLElement {
    return this.config.getPopupContainer!(triggerNode);
  }

  shouldDestroyOnHidden(): boolean {
    return this.config.destroyOnHidden!;
  }

  shouldKeepFresh(): boolean {
    return this.config.fresh!;
  }
}

export const popoverService = new PopoverService();