// Import the necessary dependencies for testing
import { test, expect, describe, beforeEach, afterEach } from "vitest";
import jest from "jest-mock";

import {
  dropdownCallback,
  tabCallback,
  offcanvasCallback,
  buttonCallback,
  modalCallback,
  rippleCallback,
  collapseCallback,
} from "../../../src/js/autoinit/autoinitCallbacks";
import EventHandler from "../../../src/js/dom/event-handler";

describe("dropdownCallback", () => {
  let mockComponent;
  let mockInitSelector;
  let mockEventHandler;

  beforeEach(() => {
    mockComponent = {
      NAME: "dropdown",
      getOrCreateInstance: jest.fn(),
      toggle: jest.fn(),
    };
    mockInitSelector = "[data-te-dropdown]";
    mockEventHandler = {
      on: jest.spyOn(EventHandler, "on"),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should register click event with correct arguments", () => {
    dropdownCallback(mockComponent, mockInitSelector);

    expect(mockEventHandler.on).toHaveBeenCalledWith(
      document,
      `click.te.${mockComponent.NAME}`,
      mockInitSelector,
      expect.any(Function)
    );
  });

  test("should call getOrCreateInstance and toggle methods when event is triggered", () => {
    const mockEvent = {
      preventDefault: jest.fn(),
    };
    const mockInstance = {
      toggle: jest.fn(),
    };
    mockComponent.getOrCreateInstance.mockReturnValueOnce(mockInstance);

    dropdownCallback(mockComponent, mockInitSelector);

    const eventHandlerCallback = mockEventHandler.on.mock.calls[0][3];
    eventHandlerCallback(mockEvent);

    expect(mockComponent.getOrCreateInstance).toHaveBeenCalledWith(
      mockEvent.target
    );
    expect(mockInstance.toggle).toHaveBeenCalled();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});

describe("tabCallback", () => {
  let mockComponent;
  let mockInitSelector;
  let mockEventHandler;

  beforeEach(() => {
    mockComponent = {
      NAME: "tab",
      getOrCreateInstance: jest.fn(),
    };
    mockInitSelector = "[data-te-tab]";
    mockEventHandler = jest.spyOn(EventHandler, "on").mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should register click event with correct arguments", () => {
    tabCallback(mockComponent, mockInitSelector);

    expect(mockEventHandler).toHaveBeenCalledWith(
      // Update, use the mockEventHandler instead of mockEventHandler.on
      document,
      `click.te.${mockComponent.NAME}.data-api`,
      mockInitSelector,
      expect.any(Function)
    );
  });

  test("should call getOrCreateInstance method when event is triggered", () => {
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        nodeType: 1,
        tagName: "A",
        classList: {
          contains: jest.fn().mockReturnValue(false),
        },
        hasAttribute: jest.fn().mockReturnValue(false),
        getAttribute: jest.fn().mockReturnValue("#target"),
      },
    };
    const mockInstance = {
      show: jest.fn(),
    };

    mockComponent.getOrCreateInstance.mockReturnValueOnce(mockInstance);

    tabCallback(mockComponent, mockInitSelector);

    const eventHandlerCallback = mockEventHandler.mock.calls[0][3];
    eventHandlerCallback.call(mockEvent.target, mockEvent);

    expect(mockComponent.getOrCreateInstance).toHaveBeenCalled();
    expect(mockInstance.show).toHaveBeenCalled();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});

describe("offcanvasCallback", () => {
  let mockComponent;
  let mockInitSelector;
  let mockEventHandler;

  beforeEach(() => {
    mockComponent = {
      NAME: "offcanvas",
      getOrCreateInstance: jest.fn(),
    };
    mockInitSelector = "[data-te-offcanvas]";
    mockEventHandler = {
      on: jest.fn(),
    };

    jest.spyOn(EventHandler, "on").mockImplementation(mockEventHandler.on);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should register click event with correct arguments", () => {
    offcanvasCallback(mockComponent, mockInitSelector);

    expect(EventHandler.on).toHaveBeenCalledWith(
      document,
      `click.te.${mockComponent.NAME}.data-api`,
      mockInitSelector,
      expect.any(Function)
    );
  });

  test("should call getOrCreateInstance method when event is triggered", () => {
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        nodeType: 1,
        tagName: "A",
        classList: {
          contains: jest.fn().mockReturnValue(false),
        },
        hasAttribute: jest.fn().mockReturnValue(false),
        getAttribute: jest.fn().mockReturnValue("#target"),
      },
    };
    const mockInstance = {
      toggle: jest.fn(),
    };

    mockComponent.getOrCreateInstance.mockReturnValueOnce(mockInstance);

    offcanvasCallback(mockComponent, mockInitSelector);

    const eventHandlerCallback = mockEventHandler.on.mock.calls[0][3];
    eventHandlerCallback.call(mockEvent.target, mockEvent);

    expect(mockComponent.getOrCreateInstance).toHaveBeenCalled();
    expect(mockInstance.toggle).toHaveBeenCalled();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});

describe("buttonCallback", () => {
  let mockComponent;
  let mockInitSelector;
  let mockEventHandler;

  beforeEach(() => {
    mockComponent = {
      NAME: "button",
      getOrCreateInstance: jest.fn(),
    };
    mockInitSelector = "[data-te-button]";
    mockEventHandler = {
      on: jest.fn(),
    };

    jest.spyOn(EventHandler, "on").mockImplementation(mockEventHandler.on);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should register click event with correct arguments", () => {
    buttonCallback(mockComponent, mockInitSelector);

    expect(EventHandler.on).toHaveBeenCalledWith(
      document,
      `click.te.${mockComponent.NAME}`,
      mockInitSelector,
      expect.any(Function)
    );
  });

  test("should call getOrCreateInstance method when event is triggered", () => {
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        closest: jest.fn(),
      },
    };
    const mockInstance = {
      toggle: jest.fn(),
    };

    mockComponent.getOrCreateInstance.mockReturnValueOnce(mockInstance);

    buttonCallback(mockComponent, mockInitSelector);

    const eventHandlerCallback = mockEventHandler.on.mock.calls[0][3];
    eventHandlerCallback.call(mockEvent.target, mockEvent);

    expect(mockComponent.getOrCreateInstance).toHaveBeenCalled();
    expect(mockInstance.toggle).toHaveBeenCalled();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});

describe("modalCallback", () => {
  let mockComponent;
  let mockInitSelector;
  let mockEventHandler;

  beforeEach(() => {
    mockComponent = {
      NAME: "modal",
      getOrCreateInstance: jest.fn(),
    };
    mockInitSelector = "[data-te-modal]";
    mockEventHandler = jest.spyOn(EventHandler, "on").mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should register click event with correct arguments", () => {
    modalCallback(mockComponent, mockInitSelector);

    expect(mockEventHandler).toHaveBeenCalledWith(
      document,
      `click.te.${mockComponent.NAME}`,
      mockInitSelector,
      expect.any(Function)
    );
  });

  test("should call getOrCreateInstance method when event is triggered", () => {
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        tagName: "A",
        getAttribute: jest.fn().mockReturnValue("#target"),
      },
    };
    const mockInstance = {
      toggle: jest.fn(),
    };

    mockComponent.getOrCreateInstance.mockReturnValueOnce(mockInstance);

    modalCallback(mockComponent, mockInitSelector);

    const eventHandlerCallback = mockEventHandler.mock.calls[0][3];
    eventHandlerCallback.call(mockEvent.target, mockEvent);

    expect(mockComponent.getOrCreateInstance).toHaveBeenCalled();
    expect(mockInstance.toggle).toHaveBeenCalled();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});
