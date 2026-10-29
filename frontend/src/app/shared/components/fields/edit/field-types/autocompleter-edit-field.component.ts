//-- copyright
// OpenProject is an open source project management software.
// Copyright (C) the OpenProject GmbH
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.
//
// See COPYRIGHT and LICENSE files for more details.
//++

import { Directive } from '@angular/core';
import { HalResource } from 'core-app/features/hal/resources/hal-resource';
import { IAutocompleteItem } from 'core-app/shared/components/autocompleter/op-autocompleter/op-autocompleter.component';
import { AutocompleterModel } from 'core-app/shared/components/autocompleter/op-autocompleter/typings';
import { EditFieldComponent } from '../edit-field.component';

function isModelItem(value:unknown):value is IAutocompleteItem|string|number {
  if (value instanceof HalResource || typeof value === 'string' || typeof value === 'number') {
    return true;
  }

  return typeof value === 'object' && value !== null
    && 'id' in value && (value.id === null || typeof value.id === 'string' || typeof value.id === 'number')
    && 'href' in value && (value.href === null || typeof value.href === 'string')
    && 'name' in value && typeof value.name === 'string';
}

@Directive()
export abstract class AutocompleterEditFieldComponent extends EditFieldComponent {
  public get autocompleterModel():AutocompleterModel<IAutocompleteItem> {
    const value = this.value;
    if (value === null || value === undefined || isModelItem(value)
      || (Array.isArray(value) && value.every(isModelItem))) {
      return value;
    }

    throw new TypeError(`Invalid autocompleter model for ${this.name}`);
  }

  public get projectId():string|undefined {
    const project = this.resource.project;
    return project instanceof HalResource ? project.id ?? undefined : undefined;
  }
}
