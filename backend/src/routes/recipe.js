import { Router } from 'express';
import { supabase } from '../supabase.js';

const router = Router();

// GET /api/recipe -> list all rows, newest first
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('recipe')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /api/recipe -> create a row. Body: { "title": "..." }
router.post('/', async (req, res) => {
  const { title, description, ingredients, tools } = req.body ?? {};

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required' });
  }
  const DEMO_PROFILE_ID = 1; // Replace with the actual profile_id value you want to insert

  const { data, error } = await supabase
    .from('recipe')
    .insert({ profile_id: DEMO_PROFILE_ID, title: title.trim(), description: description?.trim() || null, ingredients: ingredients?.trim() || null, tools: tools?.trim() || null }) // Add profile_id to the insert statement // Replace DEMO_PROFILE_ID with the actual profile_id value you want to insert
    //.insert({ title: title.trim() })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

export default router;
