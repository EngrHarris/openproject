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

import { TestBed } from '@angular/core/testing';
import { I18nService } from 'core-app/core/i18n/i18n.service';
import { CurrentProjectService } from 'core-app/core/current-project/current-project.service';
import { NoResultsComponent } from 'core-app/shared/components/no-results/no-results.component';
import { OpSharedModule } from 'core-app/shared/shared.module';
import { CHART_TYPE_IDENTIFIERS } from '../chart-type';
import { WorkPackageEmbeddedGraphComponent } from './wp-embedded-graph.component';

describe('WorkPackageEmbeddedGraphComponent template contracts', () => {
  beforeEach(() => {
    vi.stubGlobal('ErrorReporter', { addHook: vi.fn() });
    TestBed.overrideModule(OpSharedModule, {
      set: { imports: [], declarations: [NoResultsComponent], exports: [NoResultsComponent], providers: [] },
    });
    TestBed.configureTestingModule({
      imports: [WorkPackageEmbeddedGraphComponent],
      providers: [
        { provide: I18nService, useValue: { t: (key:string) => key } },
        { provide: CurrentProjectService, useValue: {} },
      ],
      errorOnUnknownElements: true,
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it.each(CHART_TYPE_IDENTIFIERS)('maps supported %s to a chart registry key', (type) => {
    const fixture = TestBed.createComponent(WorkPackageEmbeddedGraphComponent);
    fixture.componentRef.setInput('chartType', type);
    expect(fixture.componentInstance.mappedChartType).toBe(type === 'horizontalBar' ? 'bar' : type);
  });

  it('falls back to bar for an unsupported external chart type', () => {
    const fixture = TestBed.createComponent(WorkPackageEmbeddedGraphComponent);
    fixture.componentRef.setInput('chartType', 'unsupported');
    expect(fixture.componentInstance.mappedChartType).toBe('bar');
  });

  it('renders the real no-results component after an empty dataset refresh', () => {
    const fixture = TestBed.createComponent(WorkPackageEmbeddedGraphComponent);
    fixture.componentRef.setInput('datasets', []);
    fixture.detectChanges();
    fixture.componentRef.setInput('datasets', []);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('op-no-results')).toHaveTextContent('js.work_packages.no_results.title');
  });
});
