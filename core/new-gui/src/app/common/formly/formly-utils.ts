import { FormlyFieldConfig } from '@ngx-formly/core';
import { isDefined } from '../util/predicate';
import { SchemaAttribute } from '../../workspace/service/dynamic-schema/schema-propagation/schema-propagation.service';
import { Observable } from 'rxjs/Observable';
import { FORM_DEBOUNCE_TIME_MS } from '../../workspace/service/execute-workflow/execute-workflow.service';

export function getFieldByName(fieldName: string, fields: FormlyFieldConfig[])
  : FormlyFieldConfig | undefined {
  return fields.filter((field, _, __) => field.key === fieldName)[0];
}

export function setHideExpression(toggleHidden: string[], fields: FormlyFieldConfig[], hiddenBy: string): void {

  toggleHidden.forEach((hiddenFieldName) => {
    const fieldToBeHidden = getFieldByName(hiddenFieldName, fields);
    if (isDefined(fieldToBeHidden)) {
      fieldToBeHidden.hideExpression = '!model.' + hiddenBy;
    }
  });

}

export function setChildTypeDependency(attributes: ReadonlyArray<ReadonlyArray<SchemaAttribute> | null> | undefined, parentName: string,
                                       fields: FormlyFieldConfig[], childName: string): void {
  const timestampFieldNames = attributes?.flat().filter((attribute) => {
    return attribute.attributeType === 'timestamp';
  }).map(attribute => attribute.attributeName);

  if (timestampFieldNames) {
    const childField = getFieldByName(childName, fields);
    if (isDefined(childField)) {
      childField.expressionProperties = {
        // 'type': 'string',
        // 'templateOptions.type': JSON.stringify(timestampFieldNames) + '.includes(model.' + parentName + ')? \'string\' : \'number\'',

        'templateOptions.description': JSON.stringify(timestampFieldNames) + '.includes(model.' + parentName
          + ')? \'Input a datetime string\' : \'Input a positive number\''
      };
    }
  }

}

/**
 * Handles the form change event stream observable,
 *  which corresponds to every event the json schema form library emits.
 *
 * Applies rules that transform the event stream to trigger reasonably and less frequently,
 *  such as debounce time and distinct condition.
 *
 * Then modifies the operator property to use the new form data.
 */
export function createOutputFormChangeEventStream(
  formChangeEvent: Observable<object>,
  modelCheck: (formData: object) => boolean
): Observable<object> {

  return formChangeEvent
    // set a debounce time to avoid events triggering too often
    //  and to circumvent a bug of the library - each action triggers event twice
    .debounceTime(FORM_DEBOUNCE_TIME_MS)
    // .do(evt => console.log(evt))
    // don't emit the event until the data is changed
    .distinctUntilChanged()
    // .do(evt => console.log(evt))
    // don't emit the event if form data is same with current actual data
    // also check for other unlikely circumstances (see below)
    .filter(formData => modelCheck(formData))
    // share() because the original observable is a hot observable
    .share();

}