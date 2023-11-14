export interface CSXSEvent {
  /**
   * Retrieves the unique identifier of the application from which this event was dispatched.
   */
  readonly appId: string;

  /**
   * Retrieves or sets the payload of this event.
   */
  data: string;

  /**
   * Retrieves the unique identifier of the extension from which this event was dispatched.
   */
  readonly extensionId: string;

  /**
   * Retrieves the scope of this event.
   */
  scope: string;

  /**
   * Retrieves the type of this event.
   */
  type: string;
}
