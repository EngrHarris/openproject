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

import { HalResource } from 'core-app/features/hal/resources/hal-resource';
import { AutocompleterEditFieldComponent } from './autocompleter-edit-field.component';

describe('autocompleter edit field model boundary', () => {
  const resource = Object.create(HalResource.prototype) as HalResource;

  const newLabel = { id: null, name: 'New label', href: null };
  const user = { id: 5, name: 'Person', href: '/api/v3/users/5' };

  it.each([null, undefined, 0, '1', resource, [], [resource], ['1', 0], newLabel, [newLabel], user, [user, resource]])('preserves a valid model %j', (value) => {
    const model:unknown = Reflect.get(AutocompleterEditFieldComponent.prototype, 'autocompleterModel', { value, name: 'assignee' });
    expect(model).toBe(value);
  });

  it.each([true, { unrelated: 'value' }, [resource, false]])('rejects an invalid model %j at the edit-field boundary', (value) => {
    expect(() => Reflect.get(AutocompleterEditFieldComponent.prototype, 'autocompleterModel', { value, name: 'assignee' }))
      .toThrow('Invalid autocompleter model for assignee');
  });
});
