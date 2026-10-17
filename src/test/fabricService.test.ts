import { describe, it, expect, beforeEach } from 'vitest';
import { fabricService } from '../services/fabricService';

describe('fabricService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads verified fabric categories', async () => {
    const categories = await fabricService.getCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories.some(c => c.slug === 'cotton')).toBe(true);
    expect(categories.some(c => c.slug === 'twill')).toBe(true);
    expect(categories.some(c => c.slug === 'poplin')).toBe(true);
    expect(categories.some(c => c.slug === 'yarn-dyed-fabrics')).toBe(true);
  });

  it('fetches published fabrics and supports search queries', async () => {
    const allFabrics = await fabricService.getFabrics();
    expect(allFabrics.length).toBeGreaterThan(0);

    const searchPoplin = await fabricService.getFabrics({ searchQuery: 'poplin' });
    expect(searchPoplin.length).toBeGreaterThan(0);
    expect(searchPoplin.every(f => 
      f.name.toLowerCase().includes('poplin') ||
      f.short_description.toLowerCase().includes('poplin')
    )).toBe(true);
  });

  it('filters fabrics by pattern and application', async () => {
    const checks = await fabricService.getFabrics({ pattern: 'Checks' });
    expect(checks.every(f => f.pattern === 'Checks')).toBe(true);

    const shirting = await fabricService.getFabrics({ application: 'Shirts and casual wear' });
    expect(shirting.every(f => f.applications?.includes('Shirts and casual wear'))).toBe(true);
  });

  it('retrieves single fabric by slug', async () => {
    const fabric = await fabricService.getFabricBySlug('pure-cotton-poplin');
    expect(fabric).not.toBeNull();
    expect(fabric?.name).toContain('Pure Cotton Poplin');
    expect(fabric?.sample_available).toBe(true);
  });

  it('allows administrator to create, update, and delete fabric records', async () => {
    // 1. Create
    const created = await fabricService.saveFabric({
      name: 'Test Dobby Weave',
      slug: 'test-dobby-weave',
      category_id: 'cat-1',
      short_description: 'Lightweight dobby weave for shirting.',
      composition: '100% Cotton',
      gsm: 110,
      width: '58 inches',
      published: true,
    });

    expect(created.id).toBeDefined();
    expect(created.name).toBe('Test Dobby Weave');

    // 2. Verify exists in all fabrics
    const all = await fabricService.getAllAdminFabrics();
    expect(all.some(f => f.id === created.id)).toBe(true);

    // 3. Update
    const updated = await fabricService.saveFabric({
      ...created,
      name: 'Updated Dobby Weave',
      gsm: 115,
    });
    expect(updated.name).toBe('Updated Dobby Weave');
    expect(updated.gsm).toBe(115);

    // 4. Delete
    await fabricService.deleteFabric(created.id);
    const afterDelete = await fabricService.getAllAdminFabrics();
    expect(afterDelete.some(f => f.id === created.id)).toBe(false);
  });
});
