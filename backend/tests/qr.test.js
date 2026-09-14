import { describe, it, expect, jest } from '@jest/globals';
import qrcode from 'qrcode';

jest.mock('qrcode', () => ({
  toDataURL: jest.fn(),
  toBuffer: jest.fn(),
}));

describe('QR Code Generation', () => {
  beforeEach(() => {
    qrcode.toDataURL.mockResolvedValue('data:image/png;base64,test-qr');
    qrcode.toBuffer.mockResolvedValue(Buffer.from('test'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateUPIPayload', () => {
    it('should generate UPI payload with correct format', () => {
      const { generateUPIPayload } = require('../src/services/qrService.js');
      const amount = 250;
      const upiId = 'fenix26@upi';
      const upiName = 'FENIX26';

      const payload = generateUPIPayload(amount, upiId, upiName);

      expect(payload).toContain('upi://pay?');
      expect(payload).toContain(`pa=${upiId}`);
      expect(payload).toContain(`pn=${encodeURIComponent(upiName)}`);
      expect(payload).toContain(`am=${amount.toFixed(2)}`);
      expect(payload).toContain('cu=INR');
    });

    it('should use correct decimal places for amount', () => {
      const { generateUPIPayload } = require('../src/services/qrService.js');
      const payload = generateUPIPayload(500, 'test@upi', 'Test');
      expect(payload).toContain('am=500.00');
    });

    it('should handle different amounts', () => {
      const { generateUPIPayload } = require('../src/services/qrService.js');
      const payload100 = generateUPIPayload(100, 'test@upi', 'Test');
      const payload999 = generateUPIPayload(999, 'test@upi', 'Test');

      expect(payload100).toContain('am=100.00');
      expect(payload999).toContain('am=999.00');
    });
  });

  describe('QR Code Data URL', () => {
    it('should generate QR code data URL', async () => {
      const { generateQRCode } = require('../src/services/qrService.js');
      qrcode.toDataURL.mockResolvedValueOnce('data:image/png;base64,abc123');

      const result = await generateQRCode('upi://pay?pa=test@upi&am=250.00&cu=INR');

      expect(result).toBe('data:image/png;base64,abc123');
      expect(qrcode.toDataURL).toHaveBeenCalledWith(
        'upi://pay?pa=test@upi&am=250.00&cu=INR',
        expect.objectContaining({ width: 300 })
      );
    });
  });
});
